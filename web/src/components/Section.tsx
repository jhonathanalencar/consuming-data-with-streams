import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface SectionRootProps extends ComponentProps<'section'> {
  children: ReactNode;
}

function SectionRoot({ children, className, ...rest }: SectionRootProps) {
  return (
    <section
      className={twMerge('h-full w-full bg-zinc-950 pb-12 pt-4', className)}
      {...rest}
    >
      {children}
    </section>
  );
}

interface SectionContainerProps extends ComponentProps<'div'> {
  children: ReactNode;
}

function SectionContainer({
  children,
  className,
  ...rest
}: SectionContainerProps) {
  return (
    <div className={twMerge('container mx-auto px-4', className)} {...rest}>
      {children}
    </div>
  );
}

interface SectionTitleProps extends ComponentProps<'h1'> {
  children: ReactNode;
}

function SectionTitle({ children, className, ...rest }: SectionTitleProps) {
  return (
    <h1
      className={twMerge(
        'mb-4 text-2xl font-black tracking-wide text-zinc-100',
        className
      )}
      {...rest}
    >
      {children}
    </h1>
  );
}

export const Section = {
  Root: SectionRoot,
  Container: SectionContainer,
  Title: SectionTitle,
};
