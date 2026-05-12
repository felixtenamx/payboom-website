/**
 * Skeleton placeholder for lazy-loaded or data-fetching components.
 * Respects prefers-reduced-motion.
 */
export default function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`skeleton animate-pulse ${className}`}
      role="status"
      aria-label="Cargando..."
    />
  )
}

/** Pre-built skeleton layouts for common patterns. */
export function CardSkeleton() {
  return (
    <div className="p-8 rounded-[20px] bg-white/[0.03] border border-white/8" aria-hidden="true">
      <Skeleton className="w-14 h-14 rounded-[14px] mb-6" />
      <Skeleton className="h-7 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-4/6 mb-6" />
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-5/6 mb-2" />
      <Skeleton className="h-3 w-4/6" />
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="pt-[160px] pb-20" aria-hidden="true">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div>
            <Skeleton className="h-6 w-48 rounded-full mb-6" />
            <Skeleton className="h-12 w-full mb-3" />
            <Skeleton className="h-12 w-4/5 mb-3" />
            <Skeleton className="h-12 w-3/5 mb-8" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-3/4 mb-8" />
            <div className="flex gap-3 mb-14">
              <Skeleton className="h-12 w-40 rounded-full" />
              <Skeleton className="h-12 w-36 rounded-full" />
            </div>
          </div>
          <Skeleton className="min-h-[260px] h-[360px] sm:h-[400px] lg:h-[560px] rounded-[20px]" />
        </div>
      </div>
    </div>
  )
}
