import { tv, type VariantProps } from "tailwind-variants";

export const fieldTheme = tv({
  slots: {
    wrapper: [],
    label: ["w-full", "text-text-em-mid", "font-medium", "block", "pl-1"],
    message: [
      "mt-2",
      "flex",
      "items-start",
      "gap-1",
      "pl-1",
      "text-text-em-low",
      "data-[error]:text-text-on-error",
    ],
  },
  variants: {
    size: {
      md: {
        wrapper: ["space-y-2"],
        label: ["text-base"],
        message: ["text-sm"],
      },
      sm: {
        wrapper: ["space-y-1.5"],
        label: ["text-sm"],
        message: ["text-xs"],
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type FieldVariants = VariantProps<typeof fieldTheme>;
