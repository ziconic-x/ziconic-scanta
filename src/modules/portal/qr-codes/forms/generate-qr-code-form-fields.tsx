'use client'

import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'

import { QrCategories } from '../queries/get-qr-categories-for-generator'
import { QrCodeFormValues } from '../schemas/qr-code-schema'

interface GenerateQrCodeFormFieldsProps {
  categories: QrCategories
}

export function GenerateQrCodeFormFields({ categories }: GenerateQrCodeFormFieldsProps) {
  const { control } = useFormContext<QrCodeFormValues>()

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="categoryIds"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categories</FormLabel>
            <FormControl>
              <MultiSelect
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
                selected={field.value}
                onChange={field.onChange}
                placeholder="Select categories"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantity</FormLabel>
            <FormControl>
              <Input type="number" min={1} max={50} {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}
