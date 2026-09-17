import json
import os
import psycopg2
import psycopg2.extras


def handler(event: dict, context) -> dict:
    '''Возвращает статус платежа по order_id для отображения результата на фронтенде.
    Args: event с httpMethod, queryStringParameters (order_id)
          context с request_id
    Returns: HTTP response со статусом платежа
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if method != 'GET':
        return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}

    params = event.get('queryStringParameters') or {}
    order_id = params.get('order_id')

    if not order_id:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'order_id обязателен'})}

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute(
        "SELECT order_id, amount, currency, status, wish, customer_name, duration, activation_date, strength, "
        "payment_option, invoice_id, requisite_card, requisite_bank, requisite_owner, expires_at "
        "FROM payments WHERE order_id = %s",
        (order_id,)
    )
    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        return {'statusCode': 404, 'headers': headers, 'body': json.dumps({'error': 'Платёж не найден'})}

    return {'statusCode': 200, 'headers': headers, 'body': json.dumps(dict(row), default=str)}