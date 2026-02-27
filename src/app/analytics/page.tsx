'use client';

import { Heading } from '@/common/components/Heading';
import { Main } from '@/common/components/Layout';

import { AnalyticsPage as AnalyticsContent } from '@/modules/analytics/components/AnalyticsPage';

export default function AnalyticsPage() {
    return (
        <Main className="gap-4">
            <section className="mx-auto w-full max-w-screen-xl px-4 py-10 md:px-8">
                <Heading as="h1" className="text-2xl font-bold">
                    Analytics
                </Heading>
                <div className="mt-6">
                    <AnalyticsContent />
                </div>
            </section>
        </Main>
    );
}
