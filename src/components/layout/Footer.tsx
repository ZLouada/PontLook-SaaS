'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Mail, MapPin, Twitter, Ghost } from 'lucide-react';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const dict = useDictionary();
  const pathname = usePathname() || '/en';
  const lang = pathname.startsWith('/ar') ? 'ar' : 'en';

  return (
    <footer className="border-t border-[#1E293B] bg-background-dark text-white">
      <div className="container-site grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center">
            <Image src="/logo-pl.png" alt="PontLook Logo" width={180} height={60} className="object-contain brightness-0 invert" unoptimized />
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
            {dict.footer.about}
          </p>
          <div className="mt-5 flex items-center gap-3 text-sm text-slate-300">
            <MapPin size={16} className="text-primary-400" />
            <span>{dict.footer.location}</span>
          </div>
        </div>

        <nav aria-label="Footer — platform">
          <p className="font-heading text-sm font-semibold text-white">{dict.footer.platform}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
            <li><Link href={`/${lang}/for-providers`} className="hover:text-primary-400">{dict.nav.for_providers}</Link></li>
            <li><Link href={`/${lang}/find-training`} className="hover:text-primary-400">{dict.nav.find_training}</Link></li>
            <li><Link href={`/${lang}/research`} className="hover:text-primary-400">{dict.nav.research}</Link></li>
            <li><Link href={`/${lang}/contact`} className="hover:text-primary-400">{dict.nav.contact}</Link></li>
          </ul>
        </nav>

        <div>
          <p className="font-heading text-sm font-semibold text-white">{dict.footer.get_in_touch}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-primary-400" />
              <a href="mailto:contact@pontlook.com" className="hover:text-primary-400">
                contact@pontlook.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin size={15} className="text-primary-400" />
              <a href="https://www.linkedin.com/company/pontlook/" className="hover:text-primary-400" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </li>
            <li className="flex items-center gap-2">
              <Twitter size={15} className="text-primary-400" />
              <a href="https://x.com/PontLook" className="hover:text-primary-400" target="_blank" rel="noopener noreferrer">X</a>
            </li>
            <li className="flex items-center gap-2">
              <Ghost size={15} className="text-primary-400" />
              <a href="https://www.snapchat.com/@pontlook" className="hover:text-primary-400" target="_blank" rel="noopener noreferrer">Snapchat</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#1E293B] py-5">
        <p className="container-site text-xs text-slate-400">
          © 2019 - {new Date().getFullYear()} {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
