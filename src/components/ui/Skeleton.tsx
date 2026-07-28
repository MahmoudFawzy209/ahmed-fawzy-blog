import { cn } from "../../utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-editorial-gray-light dark:bg-editorial-gray-dark",
        className
      )}
      {...props}
    />
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 border-b border-[var(--border-color)] pb-8">
      <Skeleton className="aspect-video w-full rounded-lg" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex items-center gap-3 mt-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
