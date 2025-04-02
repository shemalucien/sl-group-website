import { relations } from "drizzle-orm"
import { integer, pgTable, serial, text, timestamp, varchar, boolean } from "drizzle-orm/pg-core"

// Subsidiaries table
export const subsidiaries = pgTable("subsidiaries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  tagline: varchar("tagline", { length: 255 }),
  description: text("description"),
  iconName: varchar("icon_name", { length: 50 }),
  primaryColor: varchar("primary_color", { length: 20 }),
  secondaryColor: varchar("secondary_color", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

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

// Define relations
export const subsidiariesRelations = relations(subsidiaries, ({ many }) => ({
  services: many(services),
  testimonials: many(testimonials),
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

