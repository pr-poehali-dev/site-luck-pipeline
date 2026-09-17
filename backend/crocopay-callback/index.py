import json
import os
import hmac
import hashlib
import psycopg2


def handler(event: dict, context) -> dict:
    '''Принимает webhook от CrocoPay, проверяет подпись и отмечает платёж оплаченным.
    Args: event с httpMethod, queryStringParameters (order_id), body (timestamp, subtotal, percentage, charge_percentage, charge_fixed, total, sign)
          context с request_id
    Returns: HTTP response со статусом обработки
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if method != 'POST':
        return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}

    params = event.get('queryStringParameters') or {}
    order_id = params.get('order_id')

    body_data = json.loads(event.get('body') or '{}')

    timestamp = body_data.get('timestamp')
    subtotal = body_data.get('subtotal')
    percentage = body_data.get('percentage')
    charge_percentage = body_data.get('charge_percentage')
    charge_fixed = body_data.get('charge_fixed')
    total = body_data.get('total')
    sign = body_data.get('sign')

    client_secret = os.environ['CROCOPAY_CLIENT_SECRET']

    message = f'{timestamp}|{subtotal}|{percentage}|{charge_percentage}|{charge_fixed}|{total}'
    expected_sign = hmac.new(client_secret.encode('utf-8'), message.encode('utf-8'), hashlib.sha256).hexdigest()

    if not sign or not hmac.compare_digest(expected_sign, sign):
        return {'statusCode': 403, 'headers': headers, 'body': json.dumps({'error': 'Invalid signature'})}

    if not order_id:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'order_id обязателен'})}

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    cur.execute(
        "UPDATE payments SET status = 'paid', paid_total = %s, paid_at = now() WHERE order_id = %s",
        (total, order_id)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'status': 'ok'})}
