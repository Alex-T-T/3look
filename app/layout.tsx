import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';

const Satoshi = localFont({
    src: '../public/fonts/Satoshi/Fonts/OTF/Satoshi-Regular.otf',
    display: 'swap',
    variable: '--satoshi-regular',
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: '3look',
    description: 'test task for 3look',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${Satoshi.className} `}>{children}</body>
        </html>
    );
}
