'use client';
import { Icon } from '@iconify-icon/react';
import * as Toast from '@radix-ui/react-toast';
import { motion } from 'framer-motion';
import { isNil, isNull } from 'lodash';
import { useMemo, type ReactNode } from 'react';

import { CustomIconProps, DotIcon } from '@/common/components/CustomIcon';
import { ToasterToast } from '@/common/components/Toast/useToast';

import type { ToastAlertVariants } from './ToastAlert.theme';
import { toastAlertTheme } from './ToastAlert.theme';

/**
 * Props for the ToastAlert component, extending ToasterToast.
 */
export interface ToastAlertProps extends ToasterToast {
    /**
     * The variant of the toast alert.
     */
    variant?: ToastAlertVariants['variant'];

    /**
     * The icon to display in the toast alert. Use `null` to remove default DotIcon.
     */
    icon?: ReactNode;

    /**
     * Custom properties for the supplied DotIcon.
     */
    iconProps?: CustomIconProps;
}

export const ToastAlert = ({
    variant = 'default',
    icon,
    title,
    description,
    action,
    iconProps,
    className,
    ...props
}: ToastAlertProps) => {
    const renderIcon = useMemo(() => {
        if (isNull(icon)) return null;
        if (!isNil(icon)) return icon;
        // If undefined when user doesn't input anything
        return (
            <DotIcon
                {...iconProps}
                className={toastAlertTheme().icon({
                    className: iconProps?.className,
                    variant
                })}
            />
        );
    }, [icon]);

    const {
        wrapper,
        title: titleClass,
        description: descriptionClass,
        close
    } = toastAlertTheme({
        variant,
        hasIcon: !!renderIcon
    });

    return (
        <Toast.Root {...props} asChild className="toast-root">
            <motion.li
                animate={{
                    x: 'var(--radix-toast-swipe-move-x, 0)',
                    opacity: 1
                }}
                className={wrapper({ className })}
                exit={{ x: '120%', opacity: 0 }}
                initial={{ x: '120%', opacity: 0 }}
                transition={{ type: 'spring' }}>
                <div className="flex gap-2">
                    {renderIcon}
                    <div className="flex flex-col gap-1">
                        {title && (
                            <Toast.Title asChild>
                                <p className={titleClass()}>{title}</p>
                            </Toast.Title>
                        )}
                        {description && (
                            <Toast.Description asChild>
                                <p className={descriptionClass()}>{description}</p>
                            </Toast.Description>
                        )}
                    </div>
                </div>
                <Toast.Close asChild>
                    <button className={close()}>
                        <Icon icon="lucide:x" />
                    </button>
                </Toast.Close>
                {action && (
                    <Toast.Action asChild altText="action" className="w-min flex-shrink-0">
                        {action}
                    </Toast.Action>
                )}
            </motion.li>
        </Toast.Root>
    );
};
