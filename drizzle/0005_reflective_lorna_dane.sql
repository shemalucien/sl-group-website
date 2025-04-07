ALTER TABLE "job_listings" ADD COLUMN "slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "job_listings" ADD COLUMN "benefits" text;--> statement-breakpoint
ALTER TABLE "job_listings" ADD COLUMN "department" varchar(100);--> statement-breakpoint
ALTER TABLE "job_listings" ADD COLUMN "employment_type" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "job_listings" ADD COLUMN "status" varchar(20) DEFAULT 'open' NOT NULL;--> statement-breakpoint
ALTER TABLE "job_listings" ADD COLUMN "application_deadline" timestamp;--> statement-breakpoint
ALTER TABLE "job_listings" ADD COLUMN "salary" varchar(100);--> statement-breakpoint
ALTER TABLE "job_listings" ADD COLUMN "application_count" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "job_listings" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "job_listings" ADD CONSTRAINT "job_listings_slug_unique" UNIQUE("slug");