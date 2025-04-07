CREATE TABLE "employees" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"position" varchar(100) NOT NULL,
	"department" varchar(100),
	"hire_date" timestamp DEFAULT now(),
	"salary" integer,
	"status" varchar(50) DEFAULT 'active',
	"subsidiary_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"title" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"type" varchar(50) NOT NULL,
	"read" boolean DEFAULT false,
	"related_id" integer,
	"related_type" varchar(50),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"amount" integer NOT NULL,
	"currency" varchar(10) DEFAULT 'RWF',
	"method" varchar(50) NOT NULL,
	"status" varchar(50) DEFAULT 'pending',
	"transaction_id" varchar(255),
	"related_id" integer,
	"related_type" varchar(50),
	"metadata" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payroll_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"employee_id" integer,
	"amount" integer NOT NULL,
	"type" varchar(50) NOT NULL,
	"description" text,
	"payment_date" timestamp NOT NULL,
	"status" varchar(50) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rental_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"daily_rate" integer NOT NULL,
	"quantity" integer DEFAULT 1,
	"available_quantity" integer DEFAULT 1,
	"category" varchar(100),
	"image_url" varchar(255),
	"subsidiary_id" integer,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rentals" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"rental_item_id" integer,
	"quantity" integer DEFAULT 1,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"total_amount" integer NOT NULL,
	"status" varchar(50) DEFAULT 'pending',
	"payment_status" varchar(50) DEFAULT 'unpaid',
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"type" varchar(50) NOT NULL,
	"data" json NOT NULL,
	"created_by" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_subsidiary_id_subsidiaries_id_fk" FOREIGN KEY ("subsidiary_id") REFERENCES "public"."subsidiaries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payroll_records" ADD CONSTRAINT "payroll_records_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rental_items" ADD CONSTRAINT "rental_items_subsidiary_id_subsidiaries_id_fk" FOREIGN KEY ("subsidiary_id") REFERENCES "public"."subsidiaries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_rental_item_id_rental_items_id_fk" FOREIGN KEY ("rental_item_id") REFERENCES "public"."rental_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;