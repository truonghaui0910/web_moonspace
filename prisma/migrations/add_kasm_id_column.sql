-- Add kasm_id and kasm_info columns to servers table
ALTER TABLE servers ADD COLUMN kasm_id VARCHAR(255) NULL;
ALTER TABLE servers ADD COLUMN kasm_info TEXT NULL;