import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import { Switch } from '@/components/ui/switch'

import { QrCategories } from '../queries/get-qr-categories-for-generator'
import { QrCodeEditFormValues } from '../schemas/qr-code-schema'

export const EditQrCodeFormFields = ({ categories }: { categories: QrCategories }) => {
  const form = useFormContext<QrCodeEditFormValues>()

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter name" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="identifier"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Identifier</FormLabel>
            <FormControl>
              <Input placeholder="Enter identifier" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
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
        control={form.control}
        name="isRejected"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Reject QR Code</FormLabel>
              <div className="text-muted-foreground text-sm">Mark this QR code as rejected</div>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
