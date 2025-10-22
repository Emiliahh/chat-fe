import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { login } from '@/api/auth_api'
import { toast } from 'react-toastify'
const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  rememberMe: z.boolean().optional(),
})
export const Route = createFileRoute('/auth/')({
  component: LoginComponent,
})

function LoginComponent() {
  const navigate = Route.useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values)
      const data = await login({
        email: values.email,
        password: values.password,
      })
      localStorage.setItem('token', data.accessToken)
      navigate({ to: '/' })
    } catch (error) {
      toast.error('Login failed')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-gray-300">Sign in to your account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-200">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="border-white/20 bg-white/10 pl-12 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-200">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className="border-white/20 bg-white/10 pr-12 pl-12 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-white"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-white/20 bg-white/10 text-blue-400 focus:ring-blue-400"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-300">
                          Remember me
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <a
                  href="#"
                  className="text-sm text-blue-400 transition-colors hover:text-blue-300"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link
                to="/auth/register"
                className="font-semibold text-blue-400 transition-colors hover:text-blue-300"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-transparent px-2 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="button"
                className="w-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <img
                  src="/google-icon-logo-svgrepo-com.svg"
                  alt="Google"
                  className="mr-2 h-5 w-5"
                />
                Continue with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
