import { Building2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Link } from '@/i18n/navigation'

import { OrganizationDropdown } from './organization-dropdown'

type OrganizationListCardProps = {
  organization: {
    id: string
    name: string
    description: string | null
    _count: {
      events: number
    }
    events: {
      _count: {
        qrCodes: number
      }
    }[]
  }
}
export const OrganizationListCard = ({ organization }: OrganizationListCardProps) => {
  return (
    <Card key={organization.id} className="overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">{organization.name}</CardTitle>
          <CardDescription>{organization.description || 'No description'}</CardDescription>
        </div>
        <OrganizationDropdown
          organizationId={organization.id}
          organizationFormValues={{
            name: organization.name,
            description: organization.description ?? undefined,
          }}
        />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <Building2 className="text-muted-foreground h-8 w-8" />
          <div className="flex-1 space-y-1">
            <p className="text-sm leading-none font-medium">
              {organization.events.reduce((acc, event) => acc + event._count.qrCodes, 0)} QR codes generated
            </p>
            <p className="text-muted-foreground text-sm">Across {organization._count.events} events</p>
          </div>
          {organization._count.events > 0 && (
            <Button asChild variant="outline" size="sm">
              <Link href={`/events?organizationId=${organization.id}`}>View events</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
