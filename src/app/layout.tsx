import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import './globals.css';

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export const metadata: Metadata = {
  title: 'Next - Better Auth - Prisma',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
};

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={cn('antialiased', inter.className)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
