import type { Metadata } from 'next';

import { CoreLayout } from '@/common/components/CoreLayout';
import { inter } from '@/common/components/font/Inter';
import { Toast } from '@/common/components/Toast';

import '@/common/styles/globals.css';
import '@/common/styles/code-input.css';

export const metadata: Metadata = {
    title: 'Did I Win Toto?',
    description: 'Generated by create next app'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className={[inter.variable].join(' ')} lang="en">
            <body>
                <CoreLayout>{children}</CoreLayout>
                <Toast />
            </body>
        </html>
    );
}
