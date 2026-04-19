type Props = {
  src: string
  alt: string
  className?: string
  aspectClass?: string
}

export function CampusPhoto({ src, alt, className = '', aspectClass = 'aspect-[4/3]' }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${aspectClass} ${className}`}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" className="size-full object-cover" />
    </div>
  )
}
