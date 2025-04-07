import { db } from "@/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCurrentUser } from "@/lib/auth"

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  // Get company settings
  const companySettings = {
    name: "SL Group",
    email: "info@slgroup.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, Suite 100, City, State 12345",
    logo: "/logo.png",
    website: "https://slgroup.com",
    socialMedia: {
      facebook: "https://facebook.com/slgroup",
      twitter: "https://twitter.com/slgroup",
      instagram: "https://instagram.com/slgroup",
      linkedin: "https://linkedin.com/company/slgroup",
    },
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Update your company details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue={companySettings.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">Website</Label>
                  <Input id="company-website" defaultValue={companySettings.website} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <Input id="company-email" type="email" defaultValue={companySettings.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Phone</Label>
                  <Input id="company-phone" defaultValue={companySettings.phone} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">Address</Label>
                <Textarea id="company-address" defaultValue={companySettings.address} />
              </div>
              <div className="space-y-2">
                <Label>Company Logo</Label>
                <div className="flex items-center gap-4">
                  <img
                    src={companySettings.logo || "/placeholder.svg"}
                    alt="Company Logo"
                    className="h-16 w-16 rounded-md object-contain border"
                  />
                  <Button variant="outline">Change Logo</Button>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>
                Connect your social media accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" defaultValue={companySettings.socialMedia.facebook} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" defaultValue={companySettings.socialMedia.twitter} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" defaultValue={companySettings.socialMedia.instagram} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" defaultValue={companySettings.socialMedia.linkedin} />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Customize the appearance of your admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable dark mode for the admin interface
                    </p>
                  </div>
                  <Switch id="dark-mode" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sidebar-compact">Compact Sidebar</Label>
                    <p className="text-sm text-muted-foreground">
                      Use a more compact version of the sidebar
                    </p>
                  </div>
                  <Switch id="sidebar-compact" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme-color">Primary Color</Label>
                  <Select defaultValue="blue">
                    <SelectTrigger id="theme-color">
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Order Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when a new order is placed
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Inventory Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when inventory is low
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Customer Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when customers send messages
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for third-party integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input id="api-key" value="••••••••••••••••••••••••••••••" readOnly />
                    <Button variant="outline">Copy</Button>
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" placeholder="https://your-app.com/webhook" />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>
                Manage connections to external services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Payment Gateway</Label>
                    <p className="text-sm text-muted-foreground">
                      Connected to Stripe
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Service</Label>
                    <p className="text-sm text-muted-foreground">
                      Connected to SendGrid
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Not connected
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Enterprise Plan</h3>
                    <p className="text-sm text-muted-foreground">$99/month</p>
                  </div>
                  <Button variant="outline">Change Plan</Button>
                </div>
                <div className="mt-4 text-sm">
                  <p>Your next billing date is <strong>May 1, 2023</strong></p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-12 rounded bg-muted"></div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Billing Address</Label>
                <div className="rounded-lg border p-4">
                  <p>SL Group</p>
                  <p>123 Business Ave, Suite 100</p>
                  <p>City, State 12345</p>
                  <p>United States</p>
                  <Button variant="link" className="p-0 h-auto mt-2">Edit Address</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View your recent invoices and payment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <div className="grid grid-cols-5 gap-2 p-4 border-b font-medium">
                  <div>Invoice</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div></div>
                </div>
                <div className="grid grid-cols-5 gap-2 p-4 border-b hover:bg-muted/50">
                  <div>INV-001</div>
                  <div>Apr 1, 2023</div>
                  <div>$99.00</div>
                  <div>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Paid
                    </span>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 p-4 border-b hover:bg-muted/50">
                  <div>INV-002</div>
                  <div>Mar 1, 2023</div>
                  <div>$99.00</div>
                  <div>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Paid
                    </span>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 p-4 hover:bg-muted/50">
                  <div>INV-003</div>
                  <div>Feb 1, 2023</div>
                  <div>$99.00</div>
                  <div>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Paid
                    </span>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}