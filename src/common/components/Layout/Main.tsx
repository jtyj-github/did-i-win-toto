import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/common/utils/cn';

interface MainProps extends ComponentPropsWithoutRef<'main'> {}

export const Main = ({ children, className, ...props }: MainProps) => {
    return (
        <main
            className={cn('to-black flex flex-col bg-gradient-to-b from-bg-base from-30%', className)}
            {...props}>
            {children}
        </main>
    );
};
