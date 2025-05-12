'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { Organizations } from '@/modules/portal/organizations/queries/get-organizations'

import { editEvent } from '../actions/edit-event'
import { EventFormValues, eventSchema } from '../schemas/organization-schema'
import { EventFormFields } from './event-form-fields'

interface EditEventFormProps {
  organizations: Organizations
  id: string
  defaultValues: EventFormValues
  onSuccess?: () => void
}

export function EditEventForm({ id, defaultValues, organizations, onSuccess }: EditEventFormProps) {
  const { execute, isExecuting } = useAction(editEvent, {
    onSuccess: () => {
      toast.success('Event updated successfully')
      form.reset()
      onSuccess?.()
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => execute({ ...values, id }))} className="space-y-6">
        <EventFormFields organizations={organizations} />

        <div className="flex justify-end">
          <Button type="submit" disabled={isExecuting}>
            {isExecuting ? 'Updating...' : 'Update Event'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
