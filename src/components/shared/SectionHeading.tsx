import Reveal from './Reveal';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }: Props) {
  const alignCls = align === 'center' ? 'mx-auto text-center' : 'text-left';
  return (
    <Reveal className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg leading-relaxed">{subtitle}</p>}
    </Reveal>
  );
}
