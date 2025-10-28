ALTER TABLE reservations
ADD COLUMN IF NOT EXISTS paypal_order_id VARCHAR(255);

COMMENT ON COLUMN reservations.paypal_order_id IS 'PayPal order ID for PayPal payments';
