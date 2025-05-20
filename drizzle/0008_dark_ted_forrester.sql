CREATE TABLE "inventory" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer,
	"quantity" integer NOT NULL,
	"reorder_level" integer DEFAULT 0,
	"reorder_quantity" integer DEFAULT 0,
	"location" varchar(100),
	"last_updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "inventory_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer,
	"quantity" integer NOT NULL,
	"transaction_type" varchar(50) NOT NULL,
	"reason" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "shipping_address" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "shipping_address" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "link" text;--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "metadata" json;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "subtotal" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "tax" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "shipping" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "billing_address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "payment_method" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "items" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "store_type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "subsidiaryId" integer;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "subsidiaryId" integer;--> statement-breakpoint
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_transactions" ADD CONSTRAINT "inventory_transactions_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;