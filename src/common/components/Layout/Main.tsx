import React, { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/common/utils/cn';

interface MainProps extends ComponentPropsWithoutRef<'main'> {}

export const Main = ({ children, ...props }: MainProps) => {
    return (
        <main
            className={cn(
                'mx-auto flex min-h-screen max-w-screen-lg flex-col items-center justify-between px-24',
                props?.className
            )}
            {...props}>
            {children}
        </main>
    );
};
