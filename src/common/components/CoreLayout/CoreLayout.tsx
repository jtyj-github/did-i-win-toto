import { PropsWithChildren } from 'react';

export const CoreLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="relative h-full min-h-screen bg-blue-800">
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute -left-24 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/30 blur-3xl" />
                <div className="absolute -right-24 bottom-1/4 h-[30rem] w-[30rem] animate-pulse rounded-full bg-indigo-500/20 blur-3xl [animation-delay:2s]" />
                <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-blue-900/15 to-transparent blur-2xl" />
            </div>
            {children}
        </div>
    );
};
