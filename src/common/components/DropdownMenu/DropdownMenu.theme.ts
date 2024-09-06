import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export const dropdownMenuTheme = tv({
  slots: {
    root: [''],
    trigger: ['focus-ring', 'data-[state=open]:after:bg-text-em-high/5'],
    content: [
      'relative',
      'z-popover',
      'w-[--radix-popper-anchor-width]',
      'min-w-[--radix-dropdown-menu-trigger-width]',
      'bg-surface-base',
      'border',
      'border-border-base',
      'will-change-[transform,opacity]',
      'data-[state=open]:data-[side=top]:animate-slideDownAndFade',
      'data-[state=open]:data-[side=right]:animate-slideLeftAndFade',
      'data-[state=open]:data-[side=bottom]:animate-slideUpAndFade',
      'data-[state=open]:data-[side=left]:animate-slideRightAndFade',
    ],
    arrow: ['fill-surface-elevated'],
  },
});

export type DropdownMenuVariants = VariantProps<typeof dropdownMenuTheme>;
