'use client'

import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, Mail, Ticket } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useRouter } from '@/i18n/navigation'

// Define the form schema with zod
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

// Infer the type from the schema
type SignInFormValues = z.infer<typeof signInSchema>

export const SignIn = () => {
  const { signIn, isLoaded, setActive } = useSignIn()

  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize react-hook-form with zod resolver
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInFormValues) => {
    if (!isLoaded) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
        strategy: 'password',
      })

      if (result.status === 'complete') {
        // For password authentication, we need to set the session
        await setActive({ session: result.createdSessionId })
        // Then redirect
        router.push('/')
      } else {
        console.log('Additional verification required:', result)
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Sign-in failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center">
          <div className="mb-2 inline-flex items-center">
            <Ticket className="mr-2 h-6 w-6" strokeWidth={1.5} />
            <span className="text-xl font-bold">Ziconic</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>Sign in to manage your events and tickets</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                      <Input type="email" placeholder="name@example.com" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-muted-foreground flex flex-col space-y-4 text-center text-sm">
        {/* <p>
          By continuing, you agree to our{' '}
          <Link href="/terms" className="hover:text-foreground underline underline-offset-4">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="hover:text-foreground underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p> */}
      </CardFooter>
    </Card>
  )
}
