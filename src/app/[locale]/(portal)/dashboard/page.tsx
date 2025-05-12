import { Activity, ArrowDownRight, ArrowUpRight, CalendarDays, QrCode } from 'lucide-react'

import { ComingSoon } from '@/components/ui-custom/coming-soon'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Dashboard() {
  return (
    <ComingSoon>
      <div className="flex-1 space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                  <CalendarDays className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-muted-foreground text-xs">+2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">QR Codes Generated</CardTitle>
                  <QrCode className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,453</div>
                  <div className="flex items-center text-xs text-green-500">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    +12.5% from last week
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">QR Scans</CardTitle>
                  <Activity className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">842</div>
                  <div className="flex items-center text-xs text-red-500">
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                    -4.2% from last week
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>QR Code Activity</CardTitle>
                  <CardDescription>QR code scans over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="bg-muted/20 text-muted-foreground flex h-[200px] w-full items-center justify-center rounded-md">
                    Activity Chart
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Your next 5 scheduled events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Tech Conference 2025', date: 'Apr 25, 2025', qrCodes: 250 },
                      { name: 'Music Festival', date: 'May 10, 2025', qrCodes: 1200 },
                      { name: 'Product Launch', date: 'May 15, 2025', qrCodes: 150 },
                    ].map((event) => (
                      <div key={event.name} className="flex items-center">
                        <div className="bg-primary mr-2 h-2 w-2 rounded-full"></div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm leading-none font-medium">{event.name}</p>
                          <p className="text-muted-foreground text-xs">{event.date}</p>
                        </div>
                        <div className="text-muted-foreground text-sm">{event.qrCodes} QRs</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>QR Code Analytics</CardTitle>
                  <CardDescription>Detailed breakdown of QR code performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/20 text-muted-foreground flex h-[300px] w-full items-center justify-center rounded-md">
                    Analytics Chart
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Scan Distribution</CardTitle>
                  <CardDescription>QR code scans by device and location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/20 text-muted-foreground flex h-[300px] w-full items-center justify-center rounded-md">
                    Distribution Chart
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Event Reports</CardTitle>
                <CardDescription>Download and export event reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/20 text-muted-foreground flex h-[400px] w-full items-center justify-center rounded-md">
                  Reports Interface
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ComingSoon>
  )
}
