import { tv, type VariantProps } from "tailwind-variants";

export const buttonIconTheme = tv({
  base: [""],
  variants: {
    size: {
      // Changing iconify icon size https://iconify.design/docs/icon-components/react/dimensions.html#icon-dimensions
      md: ["h-5", "w-5", "text-[20px]"],
      sm: ["h-4", "w-4", "text-[16px]"],
      xs: ["h-3.5", "w-3.5", "text-[14px]"],
      popover: ["h-4", "w-4", "text-[16px]"],
    },
    smSize: {
      md: ["sm:h-5", "sm:w-5", "sm:text-[20px]"],
      sm: ["sm:h-4", "sm:w-4", "sm:text-[16px]"],
      xs: ["sm:h-3.5", "sm:w-3.5", "sm:text-[14px]"],
      popover: ["sm:h-4", "sm:w-4", "sm:text-[16px]"],
    },
    mdSize: {
      md: ["md:h-5", "md:w-5", "md:text-[20px]"],
      sm: ["md:h-4", "md:w-4", "md:text-[16px]"],
      xs: ["md:h-3.5", "md:w-3.5", "md:text-[14px]"],
      popover: ["md:h-4", "md:w-4", "md:text-[16px]"],
    },
    variant: {
      input: ["text-text-em-low"],
    },
    destructive: {
      true: ["!text-text-error"],
    },
  },
});

export const buttonTheme = tv({
  base: [
    "relative",
    "inline-flex",
    "leading-none",
    "text-center",
    "justify-center",
    "items-center",
    "font-medium",
    "focus-ring",
    "transition-colors",
    "duration-300",
    "select-none",
    "whitespace-nowrap",
    "line-clamp-1",
    "border-t-[2px]",
    "after:pointer-events-none",
    "after:absolute",
    "after:inset-0",
    "after:rounded-[inherit]",
    "hover:after:bg-text-em-high/20",
    "hover:border-t-0",
    "data-[state=open]:after:bg-text-em-high/20",
    "after:transition-colors",
    "active:after:bg-transparent",
    "border-t-white/20",
    "disabled:bg-element-disabled",
    "disabled:text-text-em-placeholder",
    "disabled:after:bg-transparent",
    "disabled:cursor-not-allowed",
    "disabled:border-t-transparent",
    "data-[disabled]:border-transparent",
    "data-[disabled]:after:bg-transparent",
    "data-[disabled]:text-text-em-placeholder",
  ],
  variants: {
    size: {
      md: ["px-4", "h-10", "gap-2", "text-base", "rounded-lg"],
      sm: ["px-2.5", "h-8", "gap-1", "text-sm", "rounded-md"],
      xs: ["px-2", "h-6", "gap-1", "text-xs", "rounded-[4px]"],
      popover: ["px-3", "gap-3", "text-sm", "rounded-md", "h-[35px]"],
    },
    // For manually doing responsive variant
    smSize: {
      md: ["sm:px-4", "sm:h-10", "sm:gap-2", "sm:text-base", "sm:rounded-lg"],
      sm: ["sm:px-2.5", "sm:h-8", "sm:gap-1", "sm:text-sm", "sm:rounded-md"],
      xs: ["sm:px-2", "sm:h-6", "sm:gap-1", "sm:text-xs", "sm:rounded-[4px]"],
      popover: [
        "sm:px-3",
        "sm:gap-3",
        "sm:text-sm",
        "sm:rounded-md",
        "sm:h-[35px]",
      ],
    },
    mdSize: {
      md: ["md:px-4", "md:h-10", "md:gap-2", "md:text-base", "md:rounded-lg"],
      sm: ["md:px-2.5", "md:h-8", "md:gap-1", "md:text-sm", "md:rounded-md"],
      xs: ["md:px-2", "md:h-6", "md:gap-1", "md:text-xs", "md:rounded-[4px]"],
      popover: [
        "md:px-3",
        "md:gap-3",
        "md:text-sm",
        "md:rounded-md",
        "md:h-[35px]",
      ],
    },
    variant: {
      primary: [
        "bg-primary-default",
        "text-text-on-primary",
        "active:bg-primary-default",
        "data-[state=open]:after:bg-text-em-high/5",
      ],
      secondary: [
        "bg-element-secondary",
        "text-text-on-secondary",
        "active:bg-element-secondary",
        "border",
        "border-border-base/50",
        "data-[state=open]:after:bg-text-em-high/5",
      ],
      tertiary: [
        "bg-element-tertiary",
        "text-text-em-high",
        "active:bg-element-tertiary",
        "data-[state=open]:after:bg-text-em-high/5",
      ],
      ghost: [
        "border-t-transparent",
        "text-text-on-tertiary",
        "disabled:bg-transparent",
        "disabled:text-text-em-placeholder",
      ],
      error: [
        "bg-error",
        "text-text-on-primary",
        "active:bg-error",
        "data-[state=open]:after:bg-text-em-high/5",
      ],
      success: [
        "bg-success",
        "text-text-on-primary",
        "active:bg-success",
        "data-[state=open]:after:bg-text-em-high/5",
      ],
      popover: [
        "h-[35px]",
        "justify-start",
        "border-t-transparent",
        "text-text-em-high",
        "active:bg-element-tertiary",
        "data-[state=open]:after:bg-text-em-high/5",
        "hover:bg-element-tertiary",
      ],
      "icon-only": [
        "border-t-transparent",
        "text-text-em-low",
        "active:bg-element-tertiary",
        "data-[state=open]:after:bg-text-em-high/5",
        "hover:bg-element-tertiary",
      ],
      input: [
        "border",
        "border-border-base",
        "justify-between",
        "font-normal",
        "h-auto",
        "py-2",
        "px-3",
        "rounded-xl",
        "leading-5",
        "hover:border-t",
        "hover:after:bg-transparent",
        "data-[state=open]:after:bg-transparent",
        "data-[state=open]:ring-1",
        "data-[state=open]:ring-element-primary",
      ],
      link: [
        "text-link",
        "border-t-transparent",
        "font-normal",
        "hover:underline",
        "hover:after:bg-transparent",
        "data-[disabled]:text-text-em-placeholder",
        "data-[disabled]:bg-transparent",
        "data-[disabled]:hover:no-underline",
      ],
    },
    iconOnly: {
      true: ["px-0"],
    },
    fullWidth: {
      true: ["w-full"],
    },
    destructive: {
      true: ["!text-text-error"],
    },
    loading: {
      true: [
        "loading",
        "hover:after:bg-transparent",
        "[&>*:not(.loading)]:invisible",
      ],
    },
  },
  compoundVariants: [
    {
      size: "md",
      iconOnly: true,
      className: ["w-10"],
    },
    {
      size: "sm",
      iconOnly: true,
      className: ["w-8"],
    },
    {
      size: "xs",
      iconOnly: true,
      className: ["w-6"],
    },
    {
      variant: "link",
      size: ["sm", "md", "popover"],
      className: ["w-auto", "px-0", "h-auto"],
    },
    {
      variant: "ghost",
      loading: true,
      className: "hover:bg-transparent",
    },
    {
      variant: "input",
      size: "sm",
      className: ["px-2.5", "h-8"],
    },
  ],
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonVariants = VariantProps<typeof buttonTheme>;
export type ButtonIconVariants = VariantProps<typeof buttonIconTheme>;
