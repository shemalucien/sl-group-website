import { relations } from "drizzle-orm"
import { integer, pgTable, serial, text, timestamp, varchar, boolean, json, pgEnum, PgColumn } from "drizzle-orm/pg-core"



// Subsidiaries table
export const subsidiaries = pgTable("subsidiaries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  tagline: varchar("tagline", { length: 255 }),
  description: text("description"),  
  mission: text("mission"),
  objective: text("objective"),
  iconName: varchar("icon_name", { length: 50 }),
  primaryColor: varchar("primary_color", { length: 20 }),
  secondaryColor: varchar("secondary_color", { length: 20 }),
  isActive: boolean("is_active").default(true),
  parentId: integer("parent_id").references((): PgColumn => subsidiaries.id),
  logoUrl: varchar("logo_url", { length: 255 }),
  coverImageUrl: varchar("cover_image_url", { length: 255 }),
  address: text("address"),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 100 }),
  website: varchar("website", { length: 255 }),
  socialMediaLinks: json("social_media_links"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})


// Team members table
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  position: varchar("position", { length: 100 }).notNull(),
  bio: text("bio"),
  imageUrl: varchar("image_url", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  socialLinks: json("social_links"), // Store social media links as JSON
  department: varchar("department", { length: 100 }),
  order: integer("order").default(0), // For custom ordering
  isActive: boolean("is_active").default(true),
  isLeadership: boolean("is_leadership").default(false), // Flag for leadership team
  subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  linkedin: varchar("linkedin", { length: 255 }),
  twitter: varchar("twitter", { length: 255 }),
  facebook: varchar("facebook", { length: 255 }),
  expertise: text("expertise"),
  education: text("education"),
  featured: boolean("featured").default(false),
  sortOrder: integer("sort_order").default(0),
})


// Add services to subsidiary relations
export const subsidiaryRelations = relations(subsidiaries, ({ one, many }) => ({
  parent: one(subsidiaries, {
    fields: [subsidiaries.parentId],
    references: [subsidiaries.id],
    relationName: "parentSubsidiary",
  }),
  children: many(subsidiaries, {
    relationName: "childSubsidiaries",
  }),
  services: many(services), // Add this line to connect services
}));

// Services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  subsidiaryId: integer("subsidiary_id")
    .notNull()
    .references(() => subsidiaries.id),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  iconName: varchar("icon_name", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Add service relations
export const serviceRelations = relations(services, ({ one }) => ({
  subsidiary: one(subsidiaries, {
    fields: [services.subsidiaryId],
    references: [subsidiaries.id],
  }),
}));

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id),
  quote: text("quote").notNull(),
  author: varchar("author", { length: 100 }).notNull(),
  position: varchar("position", { length: 100 }),
  rating: integer("rating"),
  imageUrl: varchar("image_url", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  company: varchar("company", { length: 100 }),
  interest: varchar("interest", { length: 50 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  isRead: boolean("is_read").default(false),
})

// User roles enum
export const roleEnum = pgEnum("role", ["admin", "subsidiary_admin", "staff", "customer"])

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  role: roleEnum("role").default("customer"),
  subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Sessions table
export const sessions = pgTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at").notNull(),
})


// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featured_image: varchar("featured_image", { length: 255 }),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  status: varchar("status", { length: 20 }).default("draft").notNull(), // draft, published, archived
  tags: text("tags"), // Comma-separated tags
  readingTime: integer("reading_time"), // Estimated reading time in minutes
  viewCount: integer("view_count").default(0),
  is_featured: boolean("is_featured").default(false),
  allowComments: boolean("allow_comments").default(true),
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id),
  subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Blog categories
export const blogCategories = pgTable("blog_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Blog post categories (many-to-many relationship)
export const blogPostCategories = pgTable("blog_post_categories", {
  id: serial("id").primaryKey(),
  postId: integer("post_id")
    .notNull()
    .references(() => blogPosts.id, { onDelete: "cascade" }),
  categoryId: integer("category_id")
    .notNull()
    .references(() => blogCategories.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
})


// Blog comments
export const blogComments = pgTable("blog_comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id")
    .notNull()
    .references(() => blogPosts.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .references(() => users.id),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 255 }),
  content: text("content").notNull(),
  isApproved: boolean("is_approved").default(false),
  parentId: integer("parent_id").references((): PgColumn => blogComments.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// add blog post relations
export const blogPostRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
  subsidiary: one(subsidiaries, {
    fields: [blogPosts.subsidiaryId],
    references: [subsidiaries.id],
  }),
  categories: many(blogPostCategories),
  comments: many(blogComments),
}));

// Add blog category relations
export const blogCategoryRelations = relations(blogCategories, ({ many }) => ({
  posts: many(blogPostCategories, {
    relationName: "blogCategoryPosts",
  }),
}));

// Add blog post category relations (junction table)
export const blogPostCategoryRelations = relations(blogPostCategories, ({ one }) => ({
  post: one(blogPosts, {
    fields: [blogPostCategories.postId],
    references: [blogPosts.id],
  }),
  category: one(blogCategories, {
    fields: [blogPostCategories.categoryId],
    references: [blogCategories.id],
  }),
}));

// Add blog comment relations
export const blogCommentRelations = relations(blogComments, ({ one }) => ({
  post: one(blogPosts, {
    fields: [blogComments.postId],
    references: [blogPosts.id],
  }),
  user: one(users, {
    fields: [blogComments.userId],
    references: [users.id],
  }),
  parent: one(blogComments, {
    fields: [blogComments.parentId],
    references: [blogComments.id],
    relationName: "comment_replies",
  }),
}));


// Job listings
export const jobListings = pgTable("job_listings", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  requirements: text("requirements"),
  benefits: text("benefits"),
  department: varchar("department", { length: 100 }),
  location: varchar("location", { length: 100 }),
  employmentType: varchar("employment_type", { length: 50 }).notNull(), // full_time, part_time, contract, remote
  status: varchar("status", { length: 20 }).default("open").notNull(), // open, filled, closed
  applicationDeadline: timestamp("application_deadline"),
  salary: varchar("salary", { length: 100 }), // e.g. "$50,000 - $70,000" or "Competitive"
  applicationCount: integer("application_count").default(0),
  subsidiaryId: integer("subsidiary_id")
    .notNull()
    .references(() => subsidiaries.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Job applications
export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobListings.id),
  applicantName: varchar("applicant_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  resumeUrl: varchar("resume_url", { length: 255 }),
  coverLetter: text("cover_letter"),
  status: varchar("status", { length: 50 }).default("pending"), // pending, reviewed, interviewed, rejected, hired
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Social media posts
export const socialMediaPosts = pgTable("social_media_posts", {
  id: serial("id").primaryKey(),
  platform: varchar("platform", { length: 50 }).notNull(), // instagram, facebook, tiktok, etc.
  postUrl: varchar("post_url", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  caption: text("caption"),
  subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id),
  createdAt: timestamp("created_at").defaultNow(),
})

// Products for Liquor & Market
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: integer("price").notNull(), // stored in cents
  imageUrl: varchar("image_url", { length: 255 }),
  category: varchar("category", { length: 100 }), // wine, spirits, beer, etc.
  stock: integer("stock").default(0),
  isActive: boolean("is_active").default(true),
  subsidiaryId: integer("subsidiaryId"), // Added subsidiaryId column
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})



// Appointments for Liquor & Market
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  date: timestamp("date").notNull(),
  purpose: text("purpose"),
  status: varchar("status", { length: 50 }).default("scheduled"), // scheduled, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})


export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  status: varchar("status", { length: 50 }).default("pending"), // pending, processing, shipped, delivered, cancelled
  total: integer("total").notNull(),
  subtotal: integer("subtotal").notNull(),
  tax: integer("tax").notNull(),
  shipping: integer("shipping").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  billingAddress: text("billing_address").notNull(),
  paymentMethod: text("payment_method").notNull(),
  paymentIntentId: varchar("payment_intent_id", { length: 255 }),
  items: text("items").notNull(),
  storeType: text("store_type").notNull(),
  notes: text("notes"),
  subsidiaryId: integer("subsidiaryId"), // Added subsidiaryId column
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Order items
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(), // price at time of purchase, in cents
})

// Employee management
export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  position: varchar("position", { length: 100 }).notNull(),
  department: varchar("department", { length: 100 }),
  hireDate: timestamp("hire_date").defaultNow(),
  salary: integer("salary"), // stored in cents
  status: varchar("status", { length: 50 }).default("active"), // active, on_leave, terminated
  subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Payroll records
export const payrollRecords = pgTable("payroll_records", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").references(() => employees.id),
  amount: integer("amount").notNull(), // stored in cents
  type: varchar("type", { length: 50 }).notNull(), // salary, bonus, commission, etc.
  description: text("description"),
  paymentDate: timestamp("payment_date").notNull(),
  status: varchar("status", { length: 50 }).default("pending"), // pending, paid, cancelled
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Notifications
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  link: text("link"), // Added link field
  metadata: json("metadata"),
  type: varchar("type", { length: 50 }).notNull(), // order, appointment, message, system
  read: boolean("read").default(false),
  relatedId: integer("related_id"), // ID of related entity (order, appointment, etc.)
  relatedType: varchar("related_type", { length: 50 }), // Type of related entity
  createdAt: timestamp("created_at").defaultNow(),
})

// Reports
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 50 }).notNull(), // sales, inventory, employee, etc.
  data: json("data").notNull(),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Rental items
export const rentalItems = pgTable("rental_items", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  dailyRate: integer("daily_rate").notNull(), // stored in cents
  quantity: integer("quantity").default(1),
  availableQuantity: integer("available_quantity").default(1),
  category: varchar("category", { length: 100 }),
  imageUrl: varchar("image_url", { length: 255 }),
  subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Rentals
export const rentals = pgTable("rentals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  rentalItemId: integer("rental_item_id").references(() => rentalItems.id),
  quantity: integer("quantity").default(1),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  totalAmount: integer("total_amount").notNull(), // stored in cents
  status: varchar("status", { length: 50 }).default("pending"), // pending, active, returned, cancelled
  paymentStatus: varchar("payment_status", { length: 50 }).default("unpaid"), // unpaid, partial, paid
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Payments
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  amount: integer("amount").notNull(), // stored in cents
  currency: varchar("currency", { length: 10 }).default("RWF"),
  method: varchar("method", { length: 50 }).notNull(), // credit_card, momo, cash, etc.
  status: varchar("status", { length: 50 }).default("pending"), // pending, completed, failed, refunded
  transactionId: varchar("transaction_id", { length: 255 }),
  relatedId: integer("related_id"), // ID of related entity (order, rental, etc.)
  relatedType: varchar("related_type", { length: 50 }), // Type of related entity
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// add inventory table
export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  quantity: integer("quantity").notNull(),
  reorderLevel: integer("reorder_level").default(0),
  reorderQuantity: integer("reorder_quantity").default(0),
  location: varchar("location", { length: 100 }),
  lastUpdated: timestamp("last_updated").defaultNow(),
})

// inventory relations
export const inventoryRelations = relations(inventory, ({ one }) => ({
  product: one(products, {
    fields: [inventory.productId],
    references: [products.id],
  }),
}))

// Inventory transactions 

export const inventoryTransactions = pgTable("inventory_transactions", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  quantity: integer("quantity").notNull(),
  transactionType: varchar("transaction_type", { length: 50 }).notNull(), // addition, subtraction
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow(),
})

// Define relations
export const subsidiariesRelations = relations(subsidiaries, ({ many }) => ({
  services: many(services),
  testimonials: many(testimonials),
  users: many(users),
  blogPosts: many(blogPosts),
  jobListings: many(jobListings),
  socialMediaPosts: many(socialMediaPosts),
  employees: many(employees),
  rentalItems: many(rentalItems),
  teamMembers: many(teamMembers), // Added relation to team members
}))

export const servicesRelations = relations(services, ({ one }) => ({
  subsidiary: one(subsidiaries, {
    fields: [services.subsidiaryId],
    references: [subsidiaries.id],
  }),
}))

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  subsidiary: one(subsidiaries, {
    fields: [testimonials.subsidiaryId],
    references: [subsidiaries.id],
  }),
}))

export const usersRelations = relations(users, ({ one, many }) => ({
  subsidiary: one(subsidiaries, {
    fields: [users.subsidiaryId],
    references: [subsidiaries.id],
  }),
  sessions: many(sessions),
  blogPosts: many(blogPosts),
  appointments: many(appointments),
  orders: many(orders),
  employee: one(employees, {
    fields: [users.id],
    references: [employees.userId],
  }),
  notifications: many(notifications),
  rentals: many(rentals),
  payments: many(payments),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
  subsidiary: one(subsidiaries, {
    fields: [blogPosts.subsidiaryId],
    references: [subsidiaries.id],
  }),
}))

export const jobListingsRelations = relations(jobListings, ({ one, many }) => ({
  subsidiary: one(subsidiaries, {
    fields: [jobListings.subsidiaryId],
    references: [subsidiaries.id],
  }),
  applications: many(jobApplications),
}))

export const jobApplicationsRelations = relations(jobApplications, ({ one }) => ({
  job: one(jobListings, {
    fields: [jobApplications.jobId],
    references: [jobListings.id],
  }),
}))

export const socialMediaPostsRelations = relations(socialMediaPosts, ({ one }) => ({
  subsidiary: one(subsidiaries, {
    fields: [socialMediaPosts.subsidiaryId],
    references: [subsidiaries.id],
  }),
}))

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  user: one(users, {
    fields: [appointments.userId],
    references: [users.id],
  }),
}))

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}))

export const employeesRelations = relations(employees, ({ one }) => ({
  user: one(users, {
    fields: [employees.userId],
    references: [users.id],
  }),
  subsidiary: one(subsidiaries, {
    fields: [employees.subsidiaryId],
    references: [subsidiaries.id],
  }),
}))

export const payrollRecordsRelations = relations(payrollRecords, ({ one }) => ({
  employee: one(employees, {
    fields: [payrollRecords.employeeId],
    references: [employees.id],
  }),
}))

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}))

export const reportsRelations = relations(reports, ({ one }) => ({
  creator: one(users, {
    fields: [reports.createdBy],
    references: [users.id],
  }),
}))

export const rentalItemsRelations = relations(rentalItems, ({ one, many }) => ({
  subsidiary: one(subsidiaries, {
    fields: [rentalItems.subsidiaryId],
    references: [subsidiaries.id],
  }),
  rentals: many(rentals),
}))

export const rentalsRelations = relations(rentals, ({ one }) => ({
  user: one(users, {
    fields: [rentals.userId],
    references: [users.id],
  }),
  rentalItem: one(rentalItems, {
    fields: [rentals.rentalItemId],
    references: [rentalItems.id],
  }),
}))

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
}))


// Add relations for team members
export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  subsidiary: one(subsidiaries, {
    fields: [teamMembers.subsidiaryId],
    references: [subsidiaries.id],
  }),
}))
