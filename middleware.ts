import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
    console.log('Middleware protecting:', req.nextUrl.pathname)
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log('Token in middleware:', token)
        return !!token
      }
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/api/graphql/:path*']
}
