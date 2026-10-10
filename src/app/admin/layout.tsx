import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'PontLook Admin Portal | Resources Management',
  description: 'Internal CMS for managing PontLook corporate resources, events, podcasts, and articles.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-neutral-100 min-h-screen antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
