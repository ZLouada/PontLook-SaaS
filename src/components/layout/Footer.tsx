import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-sky-gradient">
      <div className="container-site grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="relative h-9 w-[54px]">
            <Image 
              src="/logo.png"
              alt="Pontlook Logo"
              fill
              className="object-contain opacity-80"
            />
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed">
            We identify GCC organizations experiencing verified workforce challenges and connect
            them with the right corporate training providers. Qualified opportunities only — no
            retainers, no cold outreach.
          </p>
          <div className="mt-5 flex items-center gap-3 text-sm">
            <MapPin size={16} className="text-primary" />
            <span>Riyadh · Dubai · Serving the GCC</span>
          </div>
        </div>

        <nav aria-label="Footer — platform">
          <p className="font-heading text-sm font-semibold text-ink">Platform</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/for-providers" className="hover:text-primary">For Training Providers</Link></li>
            <li><Link href="/find-training" className="hover:text-primary">Find Training</Link></li>
            <li><Link href="/insights" className="hover:text-primary">Insights</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </nav>

        <div>
          <p className="font-heading text-sm font-semibold text-ink">Get in touch</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-primary" />
              <a href="mailto:hello@pontlook.com" className="hover:text-primary">
                hello@pontlook.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin size={15} className="text-primary" />
              <a href="#" className="hover:text-primary">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5">
        <p className="container-site text-xs text-body">
          © {new Date().getFullYear()} Pontlook. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
