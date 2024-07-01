import React, { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/common/utils/cn';

interface MainProps extends ComponentPropsWithoutRef<'main'> {}

export const Main = ({ children, ...props }: MainProps) => {
    return (
        <main className={cn('mx-auto max-w-screen-lg', props?.className)} {...props}>
            {children}
        </main>
    );
};
