'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import { Organizations } from '../../organizations/queries/get-organizations'
import { addQrCategory } from '../actions/add-qr-category'
import { QrCategoryFormValues, qrCategorySchema } from '../schemas/qr-category-schema'

type AddQrCategoryFormProps = {
  organizations: Organizations
  onSuccess?: () => void
}

export function AddQrCategoryForm({ onSuccess, organizations }: AddQrCategoryFormProps) {
  const form = useForm<QrCategoryFormValues>({
    resolver: zodResolver(qrCategorySchema),
    defaultValues: {
      name: '',
      description: '',
      isPublic: false,
      organizationId: undefined,
    },
  })

  const { execute, isExecuting } = useAction(addQrCategory, {
    onSuccess: () => {
      toast.success('QR category created successfully')
      form.reset()
      onSuccess?.()
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const isPublic = useWatch({ control: form.control, name: 'isPublic' })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the name of the QR category" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description of the QR category" className="resize-none" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Public QR Code Category</FormLabel>
                <div className="text-muted-foreground text-sm">
                  Make this category visible for all organizations
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)
                    form.setValue('organizationId', undefined)
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {!isPublic && (
          <FormField
            control={form.control}
            name="organizationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an organization" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {organizations.map((organization) => (
                      <SelectItem key={organization.id} value={organization.id}>
                        {organization.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={isExecuting}>
            {isExecuting ? 'Creating...' : 'Create Category'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
