'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { addDays } from 'date-fns'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { Organizations } from '@/modules/portal/organizations/queries/get-organizations'

import { addEvent } from '../actions/add-event'
import { EventFormValues, eventSchema } from '../schemas/organization-schema'
import { EventFormFields } from './event-form-fields'

interface AddEventFormProps {
  organizations: Organizations
  onSuccess?: () => void
}

export function AddEventForm({ organizations, onSuccess }: AddEventFormProps) {
  const { execute, isExecuting } = useAction(addEvent, {
    onSuccess: () => {
      toast.success('Event created successfully')
      form.reset()
      onSuccess?.()
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      startDate: addDays(new Date(), 1),
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className="space-y-6">
        <EventFormFields organizations={organizations} />

        <div className="flex justify-end">
          <Button type="submit" disabled={isExecuting}>
            {isExecuting ? 'Creating...' : 'Create Event'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
