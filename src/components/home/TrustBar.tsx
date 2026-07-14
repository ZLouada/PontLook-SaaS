import Reveal from '@/components/shared/Reveal';
import { SearchCheck, Users, Wallet, MapPin } from 'lucide-react';

const values = [
  { icon: SearchCheck, title: 'Verified Needs', text: 'Confirmed pain points only' },
  { icon: Users, title: 'Direct Access', text: 'Talk to decision makers' },
  { icon: Wallet, title: 'Zero Retainers', text: 'Pay per qualified lead' },
  { icon: MapPin, title: 'GCC Focused', text: 'Deep regional expertise' },
];

export default function TrustBar() {
  return (
    <section className="border-y border-primary-100 bg-white">
      <Reveal className="container-site">
        <div className="grid grid-cols-2 gap-8 py-10 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary mb-3">
                <v.icon size={22} />
              </span>
              <p className="font-heading text-lg font-bold text-ink">{v.title}</p>
              <p className="mt-1 text-sm text-body">{v.text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
