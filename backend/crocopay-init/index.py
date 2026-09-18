import json
import os
import uuid
import urllib.request
import urllib.parse
import urllib.error
import psycopg2


def handler(event: dict, context) -> dict:
    '''Создаёт платёж в CrocoPay (RUB) и возвращает redirect_url на форму оплаты.
    Args: event с httpMethod, body (amount, wish, customerName, duration, activationDate, strength)
          context с request_id
    Returns: HTTP response с redirect_url платёжной формы CrocoPay
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

    if not amount or int(amount) <= 0:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Некорректная сумма'})}

    amount = int(amount)
    order_id = str(uuid.uuid4())

    client_id = os.environ['CROCOPAY_CLIENT_ID']
    client_secret = os.environ['CROCOPAY_CLIENT_SECRET']

    origin = 'https://' + event.get('headers', {}).get('Host', '')
    success_url = f'{origin}/payment?status=success&order_id={order_id}'
    cancel_url = f'{origin}/payment?status=cancel&order_id={order_id}'
    callback_url_base = 'https://functions.poehali.dev/6ac24633-a389-4133-91ec-3438d7b29d98'
    callback_url = f'{callback_url_base}?order_id={order_id}'

    payload = {
        'client_id': client_id,
        'client_secret': client_secret,
        'amount': amount,
        'currency': 'RUB',
        'successUrl': success_url,
        'cancelUrl': cancel_url,
        'callbackUrl': callback_url
    }

    data = urllib.parse.urlencode(payload).encode('utf-8')
    req = urllib.request.Request(
        'https://crocopay.tech/api/v2/initiate-payment',
        data=data,
        headers={'Content-Type': 'application/x-www-form-urlencoded'},
        method='POST'
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            resp_data = json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {'statusCode': 502, 'headers': headers, 'body': json.dumps({'error': 'Ошибка платёжного шлюза', 'details': error_body})}

    if resp_data.get('status') != 'success':
        return {'statusCode': 502, 'headers': headers, 'body': json.dumps({'error': resp_data.get('message', 'Не удалось создать платёж')})}

    redirect_url = resp_data.get('redirect_url')

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO payments (order_id, amount, currency, status, wish, customer_name, duration, activation_date, strength, redirect_url) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (order_id, amount, 'RUB', 'pending', wish, customer_name, duration, activation_date, strength, redirect_url)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'redirect_url': redirect_url, 'order_id': order_id})
    }
