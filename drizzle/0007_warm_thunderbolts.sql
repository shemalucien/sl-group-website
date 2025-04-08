CREATE TABLE "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"position" varchar(100) NOT NULL,
	"bio" text,
	"image_url" varchar(255),
	"email" varchar(255),
	"phone" varchar(50),
	"social_links" json,
	"department" varchar(100),
	"order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"is_leadership" boolean DEFAULT false,
	"subsidiary_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"linkedin" varchar(255),
	"twitter" varchar(255),
	"facebook" varchar(255),
	"expertise" text,
	"education" text,
	"featured" boolean DEFAULT false,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_subsidiary_id_subsidiaries_id_fk" FOREIGN KEY ("subsidiary_id") REFERENCES "public"."subsidiaries"("id") ON DELETE no action ON UPDATE no action;