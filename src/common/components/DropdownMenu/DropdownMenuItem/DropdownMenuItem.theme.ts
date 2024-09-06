import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export const dropdownMenuItemTheme = tv({
  slots: {
    item: [
      'relative',
      'flex',
      'items-center',
      'justify-start',
      'gap-3',
      'px-4',
      'h-14',
      'outline-none',
      'font-bold',
      'text-elements-mid-em',
      'select-none',
      'hover:bg-base-bg-3',
    ],
    itemIcon: ['z-elevated'],
  },
  variants: {
    size: {
      sm: {
        itemIcon: ['h-4', 'w-4'],
      },
      md: {
        itemIcon: ['h-6', 'w-6'],
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

export type DropdownMenuItemVariants = VariantProps<
  typeof dropdownMenuItemTheme
>;
