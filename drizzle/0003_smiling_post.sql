ALTER TABLE "subsidiaries" ADD COLUMN "parent_id" integer;--> statement-breakpoint
ALTER TABLE "subsidiaries" ADD COLUMN "logo_url" varchar(255);--> statement-breakpoint
ALTER TABLE "subsidiaries" ADD COLUMN "cover_image_url" varchar(255);--> statement-breakpoint
ALTER TABLE "subsidiaries" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "subsidiaries" ADD COLUMN "phone" varchar(20);--> statement-breakpoint
ALTER TABLE "subsidiaries" ADD COLUMN "email" varchar(100);--> statement-breakpoint
ALTER TABLE "subsidiaries" ADD COLUMN "website" varchar(255);--> statement-breakpoint
ALTER TABLE "subsidiaries" ADD COLUMN "social_media_links" json;--> statement-breakpoint
ALTER TABLE "subsidiaries" ADD CONSTRAINT "subsidiaries_parent_id_subsidiaries_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."subsidiaries"("id") ON DELETE no action ON UPDATE no action;