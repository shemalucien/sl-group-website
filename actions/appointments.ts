"use server"

import { db } from "@/db"
import { appointments } from "@/db/schema"
import { getCurrentUser } from "@/lib/auth"
import { PgColumn } from "drizzle-orm/pg-core"
import { revalidatePath } from "next/cache"

export async function createAppointment({
  userId,
  date,
  purpose,
}: {
  userId: number
  date: Date
  purpose: string
}) {
  try {
    // Check if user is authenticated
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { success: false, message: "You must be logged in to book an appointment" }
    }

    // Ensure the date is in the future
    const now = new Date()
    if (date < now) {
      return { success: false, message: "Appointment date must be in the future" }
    }

    // Create the appointment
    await db.insert(appointments).values({
      userId,
      date,
      purpose,
      status: "scheduled",
    })

    revalidatePath("/dashboard/appointments")
    return { success: true }
  } catch (error) {
    console.error("Failed to create appointment:", error)
    return { success: false, message: "Failed to create appointment" }
  }
}

export async function getUserAppointments(userId: number) {
  try {
    const userAppointments = await db.query.appointments.findMany({
      where: (appointments, { eq }) => eq(appointments.userId, userId),
      orderBy: (appointments, { asc }) => [asc(appointments.date)],
    })

    return { success: true, data: userAppointments }
  } catch (error) {
    console.error("Failed to fetch user appointments:", error)
    return { success: false, message: "Failed to fetch appointments" }
  }
}

export async function updateAppointmentStatus({
  appointmentId,
  status,
}: {
  appointmentId: number
  status: string
}) {
  try {
    // Check if user is authenticated
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { success: false, message: "You must be logged in to update an appointment" }
    }

    // Update the appointment
    await db
      .update(appointments)
      .set({ status })
      .where(eq(appointments.id, appointmentId))
  

    revalidatePath("/dashboard/appointments")
    return { success: true }
  } catch (error) {
    console.error("Failed to update appointment:", error)
    return { success: false, message: "Failed to update appointment" }
  }
}
function eq(id: PgColumn<{ name: "id"; tableName: "appointments"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; isPrimaryKey: true; isAutoincrement: false; hasRuntimeDefault: false; enumValues: undefined; baseColumn: never; identity: undefined; generated: undefined }, {}, {}>, appointmentId: number): import("drizzle-orm").SQL<unknown> | undefined {
  throw new Error("Function not implemented.")
}

