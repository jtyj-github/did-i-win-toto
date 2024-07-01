import React from 'react';

import { Heading } from '@/common/components/Heading';
import { Main } from '@/common/components/Layout';

export default function Home() {
    return (
        <Main>
            <Heading as="h1" className="font-medium">
                Home
            </Heading>
        </Main>
    );
}
