'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { addOrganization } from '../actions/add-organization'
import { OrganizationFormValues, organizationSchema } from '../schemas/organization-schema'
import { OrganizationFormFields } from './organization-form-fields'

interface AddOrganizationFormProps {
  onSuccess?: () => void
}

export function AddOrganizationForm({ onSuccess }: AddOrganizationFormProps) {
  const { execute, isExecuting } = useAction(addOrganization, {
    onSuccess: () => {
      toast.success('Organization created successfully')
      form.reset()
      onSuccess?.()
    },
    onError: ({ error }) => {
      toast.error(error.serverError || 'Something went wrong')
    },
  })
  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          execute(values)
        })}
        className="space-y-6"
      >
        <OrganizationFormFields />

        <div className="flex justify-end">
          <Button type="submit" disabled={isExecuting}>
            {isExecuting ? 'Creating...' : 'Create Organization'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
