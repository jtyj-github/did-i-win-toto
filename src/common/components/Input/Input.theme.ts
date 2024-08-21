import { tv, type VariantProps } from "tailwind-variants";

export const inputTheme = tv({
  slots: {
    content: [
      "w-full",
      "flex",
      "items-center",
      "min-h-[40px]",
      "border",
      "whitespace-nowrap",
      "transition-all",
      "text-text-em-high",
      "border",
      "border-border-base",
      "[&_input::placeholder]:text-text-em-placeholder",
      "focus-within:border-element-primary",
      "[&_textarea::placeholder]:text-text-em-placeholder",
      "focus-within:text-text-em-mid",
    ],
    sideContent: ["text-text-em-low"],
    input: [
      "w-full",
      "flex-1",
      "bg-transparent",
      "focus:outline-none", // outline-0 doesn't work for Safari
      "text-text-em-high",
      "caret-current",
    ],
  },
  variants: {
    variant: {
      default: {
        content: ["bg-transparent"],
      },
      fill: {
        content: ["bg-surface-elevated"],
      },
    },
    size: {
      md: {
        content: [
          "py-2",
          "px-3",
          "max-h-9",
          "rounded-xl",
          "gap-2",
          "text-base",
        ],
      },
      sm: {
        content: [
          "px-2.5",
          "py-1.5",
          "max-h-[30px]",
          "rounded-md",
          "gap-1.5",
          "text-sm",
        ],
      },
    },
    hasError: {
      true: {
        content: "border-text-on-error",
      },
    },
    unstyled: {
      true: {
        content: [
          "border-none",
          "bg-transparent",
          "text-text-em-high",
          "w-fit",
          "p-0",
        ],
        input: ["text-text-em-high", "w-fit", "flex-none"],
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    unstyled: false,
  },
});

export type InputVariants = VariantProps<typeof inputTheme>;
