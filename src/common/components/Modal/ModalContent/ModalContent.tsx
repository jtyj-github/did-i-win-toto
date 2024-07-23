import { Close, Content, DialogDescription, Overlay, Portal } from '@radix-ui/react-dialog';
import type { DialogContentProps } from '@radix-ui/react-dialog';
import { Ref, forwardRef, type PropsWithChildren } from 'react';

import { Button } from '@/common/components/Button';
import { Icon } from '@/common/components/CustomIcon';
import { useModal } from '@/common/components/Modal/ModalProvider';

type PointerDownOutsideEvent = CustomEvent<{
    originalEvent: PointerEvent;
}>;

export interface ModalContentProps extends DialogContentProps {
    className?: string;
}

const ModalContent = forwardRef(
    ({ children, className, ...props }: PropsWithChildren<ModalContentProps>, ForwardedRef) => {
        const { hasCloseButton, preventClickOutsideToClose, theme } = useModal();

        const { content, close, overlay } = theme;

        const preventClickOutsideToCloseProps = preventClickOutsideToClose && {
            onPointerDownOutside: (e: PointerDownOutsideEvent) => e.preventDefault(),
            onEscapeKeyDown: (e: KeyboardEvent) => e.preventDefault()
        };

        return (
            <Portal>
                <Overlay className={overlay()}>
                    <Content
                        className={content({ className })}
                        {...preventClickOutsideToCloseProps}
                        {...props}
                        ref={ForwardedRef as Ref<HTMLDivElement>}>
                        {/* https://stackoverflow.com/questions/78728117/shadcn-warning-missing-description-or-aria-describedby-undefined-for-dia */}
                        <span hidden>
                            <DialogDescription aria-describedby="dialog-description"></DialogDescription>
                        </span>
                        {hasCloseButton && (
                            <Close asChild>
                                <Button
                                    aria-label="close"
                                    className={close()}
                                    iconLeft={<Icon icon="lucide:x" />}
                                    size="sm"
                                    variant="ghost"
                                />
                            </Close>
                        )}
                        {children}
                    </Content>
                </Overlay>
            </Portal>
        );
    }
);

ModalContent.displayName = 'ModalContent';

export { ModalContent };
