import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/common/utils/cn';

interface MainProps extends ComponentPropsWithoutRef<'main'> {}

export const Main = ({ children, className, ...props }: MainProps) => {
    return (
        <main
            className={cn('mx-auto flex max-w-screen-lg flex-col px-10 py-10', className)}
            {...props}>
            {children}
        </main>
    );
};
