import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const protectedRoutes = createRouteMatcher(['/meal(.*)', '/exercise(.*)']);

export default clerkMiddleware((auth, request) => {
  if (protectedRoutes(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api)(.*)'],
};
