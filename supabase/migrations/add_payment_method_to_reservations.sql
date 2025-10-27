-- Add payment_method column to reservations table
ALTER TABLE reservations
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50);

-- Add comment to describe the column
COMMENT ON COLUMN reservations.payment_method IS 'Payment method used for the reservation (e.g., onsite, transfer, paypal)';
