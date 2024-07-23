import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import { useModal } from '@/common/components/Modal/ModalProvider';

export interface ModalBodyProps extends ComponentPropsWithoutRef<'div'> {
    className?: string;
}

export const ModalBody = ({ children, className, ...props }: PropsWithChildren<ModalBodyProps>) => {
    const { theme } = useModal();
    const { body } = theme;

    return (
        <div
            className={body({
                className
            })}
            {...props}>
            {children}
        </div>
    );
};
