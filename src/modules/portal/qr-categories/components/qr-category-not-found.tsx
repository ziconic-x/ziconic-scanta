import { Tags } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Organizations } from '../../organizations/queries/get-organizations'
import { AddQrCategoryDialog } from '../dialogs/add-qr-category-dialog'

export const QrCategoryNotFound = ({ organizations }: { organizations: Organizations }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>No QR Categories</CardTitle>
        <CardDescription>You haven't created any QR categories yet.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <Tags className="text-muted-foreground/50 h-12 w-12" />
          <h3 className="mt-4 text-lg font-medium">No QR categories created yet</h3>
          <p className="text-muted-foreground mt-2 text-sm">Create QR categories to organize your QR codes</p>
          <AddQrCategoryDialog
            organizations={organizations}
            trigger={
              <Button className="mt-4">
                <Tags className="mr-2 h-4 w-4" />
                Create QR Category
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}
