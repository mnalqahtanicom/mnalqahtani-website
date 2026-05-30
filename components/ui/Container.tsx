import { cn } from '@/lib/utils';

export default function Container({
  children,
  className,
  narrow = false,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-8 lg:px-16',
        narrow ? 'max-w-[760px]' : 'max-w-content',
        className,
      )}
    >
      {children}
    </div>
  );
}
