'use client'

import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { OrganizationFormValues } from '../schemas/organization-schema'

export function OrganizationFormFields() {
  const { control } = useFormContext<OrganizationFormValues>()

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter organization name" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter organization description" className="resize-none" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}
