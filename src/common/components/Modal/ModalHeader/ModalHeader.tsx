import { Description, Title, type DialogDescriptionProps } from '@radix-ui/react-dialog';
import { type ComponentPropsWithoutRef, type PropsWithChildren } from 'react';

import { Heading } from '@/common/components/Heading';
import { useModal } from '@/common/components/Modal/ModalProvider';

type ModalHeaderProps = ComponentPropsWithoutRef<'div'> & {
    className?: string;
    description?: string | React.ReactNode;
    descriptionProps?: DialogDescriptionProps;
    headingProps?: ComponentPropsWithoutRef<'h2'>;
};

export const ModalHeader = ({
    children,
    description,
    className,
    descriptionProps,
    headingProps,
    ...props
}: PropsWithChildren<ModalHeaderProps>) => {
    const { theme } = useModal();
    const { header, headerDescription, headerTitle } = theme;

    return (
        <div
            className={header({
                className
            })}
            {...props}>
            <Title asChild>
                <Heading
                    {...headingProps}
                    className={headerTitle({ className: headingProps?.className })}>
                    {children}
                </Heading>
            </Title>
            {description && (
                <Description
                    {...descriptionProps}
                    className={headerDescription({
                        className: descriptionProps?.className
                    })}>
                    {description}
                </Description>
            )}
        </div>
    );
};
