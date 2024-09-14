import type { DropdownMenuTriggerProps as PrimitiveDropdownMenuTriggerProps } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuTrigger as PrimitiveDropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

import { dropdownMenuTheme } from '../DropdownMenu.theme';

export type DropdownMenuTriggerProps = PrimitiveDropdownMenuTriggerProps;

export const DropdownMenuTrigger = ({
  className,
  ...props
}: DropdownMenuTriggerProps) => {
  const { trigger } = dropdownMenuTheme();
  return (
    <PrimitiveDropdownMenuTrigger
      className={trigger({ className })}
      {...props}
    />
  );
};
