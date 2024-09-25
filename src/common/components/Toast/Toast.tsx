'use client';
import { Provider, Viewport } from '@radix-ui/react-toast';
import type { ComponentPropsWithoutRef } from 'react';

import { ToastAlert } from './ToastAlert';
import { useToast } from './useToast';

export interface ToastProps extends Omit<ComponentPropsWithoutRef<'li'>, 'onPause'> {
    duration?: number;
    onPause?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Toast = ({ ..._props }: ToastProps) => {
    const { toasts } = useToast();

    return (
        <Provider swipeDirection="right">
            {toasts.map(({ id, ...props }) => {
                return <ToastAlert key={id} id={id} {...props} />;
            })}
            {/* use top-0 to show it at the top */}
            <Viewport className="z-toast fixed left-4 right-4 top-0 flex max-h-screen flex-col-reverse justify-end sm:left-auto sm:max-w-[420px]" />
        </Provider>
    );
};
