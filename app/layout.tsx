import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';

const Satoshi = localFont({
    src: [
        {
            path: '../public/fonts/Satoshi/Fonts/OTF/Satoshi-Light.otf',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../public/fonts/Satoshi/Fonts/OTF/Satoshi-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/Satoshi/Fonts/OTF/Satoshi-Medium.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../public/fonts/Satoshi/Fonts/OTF/Satoshi-Bold.otf',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../public/fonts/Satoshi/Fonts/OTF/Satoshi-Black.otf',
            weight: '900',
            style: 'normal',
        },
    ],
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
