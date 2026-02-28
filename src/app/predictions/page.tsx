'use client';

import { Heading } from '@/common/components/Heading';
import { Main } from '@/common/components/Layout';

import { PredictionsPage as PredictionsContent } from '@/modules/predictions/components/PredictionsPage';

export default function PredictionsPage() {
    return (
        <Main className="gap-4">
            <section className="mx-auto w-full max-w-screen-xl px-4 py-10 md:px-8">
                <Heading as="h1" className="text-2xl font-bold">
                    Predictions
                </Heading>
                <div className="mt-6">
                    <PredictionsContent />
                </div>
            </section>
        </Main>
    );
}
