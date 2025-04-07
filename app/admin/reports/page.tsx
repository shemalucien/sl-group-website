import { db } from "@/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileBarChart, Download, Calendar, Filter } from 'lucide-react'
import { formatPrice } from "@/lib/utils"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default async function ReportsPage() {
  // Sample data for demonstration
  const salesData = [
    { month: "Jan", sales: 4000, orders: 240 },
    { month: "Feb", sales: 3000, orders: 198 },
    { month: "Mar", sales: 5000, orders: 305 },
    { month: "Apr", sales: 2780, orders: 189 },
    { month: "May", sales: 1890, orders: 140 },
    { month: "Jun", sales: 2390, orders: 160 },
    { month: "Jul", sales: 3490, orders: 240 },
    { month: "Aug", sales: 4000, orders: 278 },
    { month: "Sep", sales: 2780, orders: 190 },
    { month: "Oct", sales: 1890, orders: 150 },
    { month: "Nov", sales: 3490, orders: 210 },
    { month: "Dec", sales: 4000, orders: 302 },
  ]

  const subsidiaryPerformance = [
    { name: "SL Liquor", sales: 35000 },
    { name: "SL Events", sales: 28000 },
    { name: "SL Properties", sales: 42000 },
    { name: "SL Grooming", sales: 18000 },
    { name: "SL Stationery", sales: 22000 },
    { name: "SL Tech Solutions", sales: 38000 },
    { name: "SL Tech Store", sales: 31000 },
  ]

  const productPerformance = [
    { name: "Product A", sales: 12000, units: 240 },
    { name: "Product B", sales: 9000, units: 120 },
    { name: "Product C", sales: 15000, units: 180 },
    { name: "Product D", sales: 8000, units: 160 },
    { name: "Product E", sales: 11000, units: 220 },
  ]

  // Calculate total sales and orders
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0)
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0)
  const averageOrderValue = totalSales / totalOrders

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <FileBarChart className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalSales)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(averageOrderValue)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales and orders for the current year</CardDescription>
            <Select defaultValue="year">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="year">Last 12 months</SelectItem>
                <SelectItem value="quarter">Last quarter</SelectItem>
                <SelectItem value="month">Last month</SelectItem>
                <SelectItem value="week">Last week</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer
              config={{
                sales: {
                  label: "Sales",
                  color: "hsl(var(--chart-1))",
                },
                orders: {
                  label: "Orders",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sales"
                    stroke="var(--color-sales)"
                    activeDot={{ r: 8 }}
                  />
                  <Line yAxisId="right" type="monotone" dataKey="orders" stroke="var(--color-orders)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Subsidiary Performance</CardTitle>
            <CardDescription>Sales by subsidiary</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer
              config={{
                sales: {
                  label: "Sales",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subsidiaryPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="sales" fill="var(--color-sales)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sales Reports</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
          <TabsTrigger value="customers">Customer Reports</TabsTrigger>
          <TabsTrigger value="employees">Employee Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Products with highest sales</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sales: {
                      label: "Sales",
                      color: "hsl(var(--chart-1))",
                    },
                    units: {
                      label: "Units",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productPerformance} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="sales" fill="var(--color-sales)" />
                      <Bar dataKey="units" fill="var(--color-units)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Revenue distribution by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Chart data will be displayed here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>Current inventory levels and stock alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Inventory report data will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
              <CardDescription>Customer acquisition and retention metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Customer report data will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Performance</CardTitle>
              <CardDescription>Productivity and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Employee report data will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}