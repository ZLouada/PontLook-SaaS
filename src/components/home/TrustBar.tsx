import { SearchCheck, Users, Wallet, MapPin } from 'lucide-react';

const values = [
  { icon: SearchCheck, title: 'Verified Needs' },
  { icon: Users, title: 'Direct Access' },
  { icon: Wallet, title: 'Zero Retainers' },
  { icon: MapPin, title: 'GCC Focused' },
];

export default function TrustBar() {
  return (
    <section className="bg-background py-12 border-b border-border">
      <div className="container-site">
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20 text-foreground-muted">
          {values.map((v) => (
            <div key={v.title} className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                <v.icon size={24} />
              </div>
              <span className="font-heading font-semibold tracking-tight uppercase text-[15px]">
                {v.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
