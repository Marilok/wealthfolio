ALTER TABLE transactions
DROP COLUMN symbol;

ALTER TABLE transactions
ADD COLUMN symbol text not null;