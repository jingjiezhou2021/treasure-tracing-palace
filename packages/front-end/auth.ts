import NextAuth, { AuthError } from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import prisma from '@/app/lib/prisma';
import { users } from './generated/prisma';
import { getT } from '@/app/i18n';

async function getUser(email: string): Promise<users | null> {
	try {
		const user = await prisma.users.findUnique({
			where: {
				email,
			},
		});
		return user;
	} catch (error) {
		console.error('Failed to fetch user:', error);
		throw new Error('Failed to fetch user.');
	}
}

const handler = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const { t } = await getT('login_and_register');
				console.log('signing in...', credentials);
				const parsedCredentials = z
					.object({
						email: z.string().email(),
						password: z.string().min(6),
					})
					.safeParse(credentials);
				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;
					const user = await getUser(email);
					if (!user) {
						const err = new AuthError(t('用户不存在'));
						err.type = 'CredentialsSignin';
						throw err;
					}
					const passwordsMatch = await bcrypt.compare(
						password,
						user.password,
					);
					if (passwordsMatch) return user;
					else {
						const err = new AuthError(t('密码错误'));
						err.type = 'CredentialsSignin';
						throw err;
					}
				} else {
					const err = new AuthError(t('输入账号或密码格式错误'));
					err.type = 'EmailSignInError';
					throw err;
				}
			},
		}),
	],
});
export default handler;
export const { auth, signIn, signOut } = handler;
