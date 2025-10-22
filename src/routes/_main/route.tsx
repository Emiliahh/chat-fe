import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { me } from '@/api/user_api'
import { userStore } from '@/store/useStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import AsideTab from '@/components/layout/AsideTab'
const meQueryOptions = {
  queryKey: ['me'],
  queryFn: async () => {
    const res = await me()
    return res.data
  },
  retry: false,
  staleTime: 15 * 60 * 1000,
}

export const Route = createFileRoute('/_main')({
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData(meQueryOptions)
    } catch (err: any) {
      if (err instanceof Error && err.message === 'UNAUTHORIZED') {
        throw redirect({
          to: '/auth',
        })
      }
      console.error('Auth check failed:', err)
    }
  },
  component: RouteComponent,
})
function RouteComponent() {
  const { setUser } = userStore()
  const navigate = Route.useNavigate()
  const { data, error } = useQuery(meQueryOptions)

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data, setUser])

  useEffect(() => {
    if (error) {
      console.error('User query error:', error)
      if (
        error instanceof Error &&
        (error.message === 'UNAUTHORIZED' || error.name === 'AuthError')
      ) {
        console.log('Session expired, redirecting to auth...')
        setUser(null)
        navigate({ to: '/auth' })
      }
    }
  }, [error, setUser, navigate])
  return (
    <div className="grid max-h-screen grid-cols-[450px_1fr]">
      <div className="col-span-1 border-r border-r-neutral-800">
        <AsideTab />
      </div>
      <div className="h-screen bg-[#212121] text-neutral-200">
        <Outlet />
      </div>
    </div>
  )
}
