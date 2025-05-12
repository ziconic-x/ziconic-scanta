import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { ChangePasswordForm } from '../forms/change-password-form'

export const ChangePasswordCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Change your password</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ChangePasswordForm />
      </CardContent>
    </Card>
  )
}
