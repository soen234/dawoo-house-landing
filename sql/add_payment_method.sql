-- Add payment_method column to reservations table
ALTER TABLE reservations
ADD COLUMN IF NOT EXISTS payment_method TEXT;

-- Add comment
COMMENT ON COLUMN reservations.payment_method IS 'Payment method: onsite, transfer, paypal';
