import { Tags } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Link } from '@/i18n/navigation'

import { QrCategories } from '../queries/get-qr-categories'
import { QrCategoryDropdown } from './qr-category-dropdown'

type QrCategoryCardProps = {
  category: QrCategories[number]
}

export const QrCategoryCard = ({ category }: QrCategoryCardProps) => {
  return (
    <Card key={category.id} className="overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="flex flex-wrap items-center gap-2 text-xl font-bold">
            {category.name}
            <Badge variant={category.isPublic ? 'success' : 'destructive'}>
              {category.isPublic ? (
                'Public'
              ) : (
                <Link className="underline" href={`/organizations/${category.organizationId}`}>
                  Restricted to: {category.organization?.name}
                </Link>
              )}
            </Badge>
          </CardTitle>
          <CardDescription className="text-wrap break-words">
            {category.description || 'No description'}
          </CardDescription>
        </div>
        <QrCategoryDropdown
          categoryId={category.id}
          categoryFormValues={{
            name: category.name,
            isPublic: category.isPublic,
            description: category.description ?? undefined,
            organizationId: category.organizationId ?? undefined,
          }}
        />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <Tags className="text-muted-foreground h-8 w-8" />
          <div className="flex-1 space-y-1">
            <p className="text-sm leading-none font-medium">
              {category._count?.qrCodes || 0} QR codes in this category
            </p>
            <p className="text-muted-foreground text-sm">Use this category to organize your QR codes</p>
          </div>
          {/* <Button asChild variant="outline" size="sm">
            <Link href={`/qr-categories/${category.id}`}>View</Link>
          </Button> */}
        </div>
      </CardContent>
    </Card>
  )
}
