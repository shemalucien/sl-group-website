"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data for the chart - in a real app, this would come from the database
const data = [
  {
    name: "Jan",
    orders: 12,
    revenue: 4000,
  },
  {
    name: "Feb",
    orders: 18,
    revenue: 5500,
  },
  {
    name: "Mar",
    orders: 25,
    revenue: 7800,
  },
  {
    name: "Apr",
    orders: 22,
    revenue: 6900,
  },
  {
    name: "May",
    orders: 30,
    revenue: 9200,
  },
  {
    name: "Jun",
    orders: 27,
    revenue: 8500,
  },
  {
    name: "Jul",
    orders: 32,
    revenue: 10200,
  },
  {
    name: "Aug",
    orders: 35,
    revenue: 11500,
  },
  {
    name: "Sep",
    orders: 30,
    revenue: 9800,
  },
  {
    name: "Oct",
    orders: 28,
    revenue: 9000,
  },
  {
    name: "Nov",
    orders: 33,
    revenue: 10800,
  },
  {
    name: "Dec",
    orders: 40,
    revenue: 13500,
  },
]

export function Overview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Monthly orders and revenue for the current year.</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "revenue") {
                    return [`$${value}`, "Revenue"]
                  }
                  return [value, "Orders"]
                }}
              />
              <Bar dataKey="orders" fill="#adfa1d" radius={[4, 4, 0, 0]} name="Orders" />
              <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

