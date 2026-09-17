CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(64) UNIQUE NOT NULL,
    amount INTEGER NOT NULL,
    currency VARCHAR(8) NOT NULL DEFAULT 'RUB',
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    wish TEXT,
    customer_name VARCHAR(255),
    duration VARCHAR(255),
    activation_date VARCHAR(100),
    strength INTEGER DEFAULT 1,
    redirect_url TEXT,
    paid_total INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    paid_at TIMESTAMP
);