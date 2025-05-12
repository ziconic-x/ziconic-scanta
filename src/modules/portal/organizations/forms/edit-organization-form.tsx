'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { editOrganization } from '../actions/edit-organization'
import { OrganizationFormValues, organizationSchema } from '../schemas/organization-schema'
import { OrganizationFormFields } from './organization-form-fields'

interface EditOrganizationFormProps {
  organizationId: string
  defaultValues: OrganizationFormValues
  onSuccess?: () => void
}

export function EditOrganizationForm({
  organizationId,
  defaultValues,
  onSuccess,
}: EditOrganizationFormProps) {
  const { execute, isExecuting } = useAction(editOrganization, {
    onSuccess: () => {
      toast.success('Organization updated successfully')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          execute({
            organizationId,
            ...values,
          })
        })}
        className="space-y-6"
      >
        <OrganizationFormFields />

        <div className="flex justify-end">
          <Button type="submit" disabled={isExecuting}>
            {isExecuting ? 'Updating...' : 'Update Organization'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
