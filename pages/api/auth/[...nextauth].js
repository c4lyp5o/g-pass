import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { prisma } from '../../../database/prismaClient';

export const authOptions = {
  providers: [
    // REAL mailer
    EmailProvider({
      server: process.env.SMTP_HOST,
      from: process.env.SMTP_FROM,
    }),
    // OG mailer
    // EmailProvider({
    //   server: {
    //     host: process.env.SMTP_HOST,
    //     port: Number(process.env.SMTP_PORT),
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASSWORD,
    //     },
    //   },
    //   from: process.env.SMTP_FROM,
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

export default async function authHandler(req, res) {
  return await NextAuth(req, res, authOptions);
}
