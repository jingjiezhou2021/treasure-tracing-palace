import type { NextAuthConfig } from 'next-auth';
import { i18nInterceptor } from './app/i18n/settings';

export const authConfig = {
	pages: {
		signIn: '/login',
	},
	callbacks: {
		authorized({ auth, request }) {
			console.log('authing');
			const isLoggedIn = !!auth?.user;
			const isOnDashboard =
				request.nextUrl.pathname.includes('dashboard');
			if (isOnDashboard) {
				if (isLoggedIn) return i18nInterceptor(request);
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				return Response.redirect(
					new URL('/dashboard', request.nextUrl),
				);
			}
			return i18nInterceptor(request);
		},
	},
	providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
