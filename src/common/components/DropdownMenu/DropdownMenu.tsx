import * as PrimitiveDropdownMenu from '@radix-ui/react-dropdown-menu';

import { DropdownMenuContent } from './DropdownMenuContent';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuTrigger } from './DropdownMenuTrigger';

export type DropdownMenuProps = PrimitiveDropdownMenu.DropdownMenuProps;

export const DropdownMenu = ({ children, ...props }: DropdownMenuProps) => {
  return (
    <PrimitiveDropdownMenu.Root {...props}>
      {children}
    </PrimitiveDropdownMenu.Root>
  );
};

DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
