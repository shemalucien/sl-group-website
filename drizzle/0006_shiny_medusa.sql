CREATE TABLE "blog_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "blog_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "blog_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer NOT NULL,
	"user_id" integer,
	"name" varchar(100),
	"email" varchar(255),
	"content" text NOT NULL,
	"is_approved" boolean DEFAULT false,
	"parent_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "blog_post_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "blog_posts" RENAME COLUMN "featured_image_url" TO "featured_image";--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "meta_title" varchar(255);--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "meta_description" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "status" varchar(20) DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "tags" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "reading_time" integer;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "view_count" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "is_featured" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "allow_comments" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "blog_comments" ADD CONSTRAINT "blog_comments_post_id_blog_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_comments" ADD CONSTRAINT "blog_comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_comments" ADD CONSTRAINT "blog_comments_parent_id_blog_comments_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_comments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_post_categories" ADD CONSTRAINT "blog_post_categories_post_id_blog_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_post_categories" ADD CONSTRAINT "blog_post_categories_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts" DROP COLUMN "is_published";