import type { DropdownMenuItemProps as PrimitiveDropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuItem as PrimitiveDropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import type { ReactNode } from 'react';

import { cloneElement } from '@/common/utils';

import type { DropdownMenuItemVariants } from './DropdownMenuItem.theme';
import { dropdownMenuItemTheme } from './DropdownMenuItem.theme';

export interface DropdownMenuItemProps
    extends PrimitiveDropdownMenuItemProps,
        DropdownMenuItemVariants {
    icon?: ReactNode;
}

export const DropdownMenuItem = ({
    className,
    children,
    icon,
    size,
    ...props
}: DropdownMenuItemProps) => {
    const { item, itemIcon } = dropdownMenuItemTheme({ size });

    const StyledIcon = () => {
        return cloneElement({
            element: icon,
            themeStyle: itemIcon
        });
    };

    return (
        <PrimitiveDropdownMenuItem className={item({ className })} {...props}>
            {icon && <StyledIcon />}
            <span className="z-elevated">{children}</span>
        </PrimitiveDropdownMenuItem>
    );
};
