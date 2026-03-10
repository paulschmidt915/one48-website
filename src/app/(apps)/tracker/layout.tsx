import type { Viewport } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-ibm-plex-mono',
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function TrackerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className={ibmPlexMono.variable}>{children}</div>;
}
