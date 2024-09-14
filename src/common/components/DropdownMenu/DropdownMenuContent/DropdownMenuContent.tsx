import type { DropdownMenuContentProps as PrimitiveDropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import {
    DropdownMenuPortal,
    DropdownMenuContent as PrimitiveDropdownMenuContent
} from '@radix-ui/react-dropdown-menu';

import { dropdownMenuTheme } from '../DropdownMenu.theme';

export type DropdownMenuContentProps = PrimitiveDropdownMenuContentProps;

export const DropdownMenuContent = ({
    children,
    align = 'start',
    sideOffset = 8,
    ...props
}: DropdownMenuContentProps) => {
    const { content } = dropdownMenuTheme();

    return (
        <DropdownMenuPortal>
            <PrimitiveDropdownMenuContent
                align={align}
                sideOffset={sideOffset}
                {...props}
                className={content({ className: props.className })}>
                {children}
            </PrimitiveDropdownMenuContent>
        </DropdownMenuPortal>
    );
};
