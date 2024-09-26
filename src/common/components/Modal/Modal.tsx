import { Root, Trigger, type DialogProps } from '@radix-ui/react-dialog';
import { type ComponentPropsWithoutRef, type PropsWithChildren } from 'react';

import type { ModalVariants } from './Modal.theme';
import { ModalBody } from './ModalBody';
import { ModalContent } from './ModalContent';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';
import { ModalProvider } from './ModalProvider';

export interface ModalProps extends ComponentPropsWithoutRef<'div'>, ModalVariants, DialogProps {
    hasCloseButton?: boolean;
    preventClickOutsideToClose?: boolean;
}
export const Modal = ({
    children,
    hasCloseButton = true,
    hasOverlay = true,
    preventClickOutsideToClose = false,
    fullPage = false,
    overflow,
    ...props
}: PropsWithChildren<ModalProps>) => {
    return (
        <ModalProvider
            fullPage={fullPage}
            hasCloseButton={hasCloseButton}
            hasOverlay={hasOverlay}
            overflow={overflow}
            preventClickOutsideToClose={preventClickOutsideToClose}
            {...props}>
            <Root {...props}>{children}</Root>
        </ModalProvider>
    );
};

Modal.Trigger = Trigger;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
Modal.Body = ModalBody;
