import React, { PropsWithChildren } from 'react';

export const CoreLayout = ({ children }: PropsWithChildren) => {
    return <div className="relative h-full min-h-screen">{children}</div>;
};
