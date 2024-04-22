import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const notProtectRoute = createRouteMatcher(['/']);

export default clerkMiddleware((auth, request) => {
  if (!notProtectRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api)(.*)'],
};
