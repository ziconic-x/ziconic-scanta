import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { EditOrganizationDialog } from '../dialogs/edit-organization-dialog'
import { OrganizationFormValues } from '../schemas/organization-schema'

type OrganizationDropdownProps = {
  organizationId: string
  organizationFormValues: OrganizationFormValues
}

export const OrganizationDropdown = ({
  organizationId,
  organizationFormValues,
}: OrganizationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditOrganizationDialog
          organizationId={organizationId}
          defaultValues={organizationFormValues}
          trigger={
            <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
              <p>Edit organization</p>
            </DropdownMenuItem>
          }
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="text-red-600">
          Delete organization
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
