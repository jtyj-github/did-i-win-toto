import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/common/utils/cn';

interface MainProps extends ComponentPropsWithoutRef<'main'> {}

export const Main = ({ children, className, ...props }: MainProps) => {
    return (
        <main
            className={cn('flex flex-col bg-blue-700', className)}
            {...props}>
            {children}
        </main>
    );
};
