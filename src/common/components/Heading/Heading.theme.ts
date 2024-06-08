import { tv, type VariantProps } from 'tailwind-variants';

export const headingTheme = tv({
    base: ['text-text-em-high', 'tracking-tighter', 'font-medium']
});

export type HeadingVariants = VariantProps<typeof headingTheme>;
