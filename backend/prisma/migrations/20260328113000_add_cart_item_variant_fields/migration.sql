-- Add product variant fields for cart item deduplication
ALTER TABLE "CartItem"
ADD COLUMN "size" TEXT,
ADD COLUMN "color" TEXT;

CREATE INDEX "CartItem_cartId_productId_size_color_idx"
ON "CartItem"("cartId", "productId", "size", "color");
