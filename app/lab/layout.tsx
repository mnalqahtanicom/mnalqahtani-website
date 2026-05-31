import type { Metadata } from 'next';
import { fontVariables } from '@/lib/fonts';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Lab — Interactive Preview',
  robots: { index: false, follow: false },
};

// Standalone root layout for the public preview (no site chrome, own <html>).
export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
