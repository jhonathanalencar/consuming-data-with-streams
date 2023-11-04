'use client';

import { Section } from '@/components/Section';
import { MostPopularAnimesCarousel } from './components/MostPopularAnimesCarousel';
import { TopAnimesCarousel } from './components/TopAnimesCarousel';

export default function HomePage() {
  return (
    <Section.Root className="overflow-x-hidden">
      <MostPopularAnimesCarousel slidesAmount={20} />
      <div className="mt-8">
        <TopAnimesCarousel slidesAmount={20} />
      </div>
    </Section.Root>
  );
}
