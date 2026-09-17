import json
import os
import uuid
import urllib.request
import urllib.parse
import urllib.error
import psycopg2


ALLOWED_PAYMENT_OPTIONS = {'TO_CARD', 'SBP', 'QR_NSPK'}


def handler(event: dict, context) -> dict:
    '''Создаёт H2H-счёт в CrocoPay (RUB) на карту/СБП/QR и возвращает реквизиты оплаты.
    Args: event с httpMethod, body (amount, wish, customerName, duration, activationDate, strength, paymentOption)
          context с request_id
    Returns: HTTP response с реквизитами оплаты (card/bank_receiver/card_owner) и order_id
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if method != 'POST':
        return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}

    body_data = json.loads(event.get('body') or '{}')
    amount = body_data.get('amount')
    wish = body_data.get('wish', '')
    customer_name = body_data.get('customerName', '')
    duration = body_data.get('duration', '')
    activation_date = body_data.get('activationDate', '')
    strength = body_data.get('strength', 1)
    payment_option = body_data.get('paymentOption', 'TO_CARD')

    if not amount or int(amount) <= 0:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Некорректная сумма'})}

    if payment_option not in ALLOWED_PAYMENT_OPTIONS:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Недопустимый способ оплаты'})}

    amount = int(amount)
    order_id = str(uuid.uuid4())

    client_id = os.environ['CROCOPAY_CLIENT_ID']
    client_secret = os.environ['CROCOPAY_CLIENT_SECRET']

    callback_url = f'https://functions.poehali.dev/6ac24633-a389-4133-91ec-3438d7b29d98?order_id={order_id}'

    payload = json.dumps({
        'amount': amount,
        'currency': 'RUB',
        'payment_option': payment_option,
        'callback_url': callback_url
    }).encode('utf-8')

    req = urllib.request.Request(
        'https://crocopay.tech/api/v2/h2h/invoices',
        data=payload,
        headers={
            'Content-Type': 'application/json',
            'Client-Id': client_id,
            'Client-Secret': client_secret
        },
        method='POST'
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            resp_data = json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {'statusCode': 502, 'headers': headers, 'body': json.dumps({'error': 'Ошибка платёжного шлюза', 'details': error_body})}

    if resp_data.get('status') and resp_data.get('status') == 'error':
        return {'statusCode': 502, 'headers': headers, 'body': json.dumps({'error': resp_data.get('message', 'Не удалось создать счёт')})}

    invoice_id = resp_data.get('id')
    requisite_card = resp_data.get('card')
    requisite_bank = resp_data.get('bank_receiver')
    requisite_owner = resp_data.get('card_owner')
    expires_at = resp_data.get('expires_at')

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO payments (order_id, amount, currency, status, wish, customer_name, duration, activation_date, strength, payment_option, invoice_id, requisite_card, requisite_bank, requisite_owner, expires_at) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (order_id, amount, 'RUB', 'pending', wish, customer_name, duration, activation_date, strength, payment_option, invoice_id, requisite_card, requisite_bank, requisite_owner, expires_at)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({
            'order_id': order_id,
            'invoice_id': invoice_id,
            'payment_option': payment_option,
            'card': requisite_card,
            'bank_receiver': requisite_bank,
            'card_owner': requisite_owner,
            'amount': amount,
            'expires_at': expires_at
        })
    }
