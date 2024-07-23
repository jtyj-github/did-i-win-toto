import { tv, type VariantProps } from "tailwind-variants";

export const modalTheme = tv(
  {
    slots: {
      overlay: [
        "z-modal",
        "fixed",
        "inset-0",
        "bg-bg-base/90",
        "backdrop-blur-sm",
        "overflow-y-auto",
        "flex",
        "justify-center",
        "data-[state=closed]:animate-[dialog-overlay-hide_200ms]",
        "data-[state=open]:animate-[dialog-overlay-show_200ms]",
        "data-[state=closed]:hidden", // Fix overlay not close when modal is closed
      ],
      close: [
        "absolute",
        "right-6",
        "top-[22px]",
        "text-text-em-low",
        "sm:right-10",
        "sm:top-[38px]",
        "z-elevated",
      ],
      header: ["flex", "flex-col", "gap-2", "items-start", "px-6", "sm:px-10"],
      headerTitle: ["text-lg", "sm:text-xl", "text-text-em-high"],
      headerDescription: ["text-sm", "text-text-em-low"],
      footer: [
        "flex",
        "justify-end",
        "flex-wrap",
        "gap-3",
        "sm:gap-4",
        "px-6",
        "sm:px-10",
      ],
      content: [
        "h-fit",
        "sm:min-h-0",
        "sm:m-auto",
        "relative",
        "flex",
        "flex-col",
        "gap-y-5",
        "sm:gap-y-6",
        "py-6",
        "sm:py-10",
        "overflow-hidden",
        "w-full",
        "max-w-[560px]",
        "rounded-xl",
        "bg-surface-base",
        "border",
        "border-border-base",
        "text-text-em-high",
        "shadow-lg",
      ],
      body: ["flex-1", "px-6", "sm:px-10"],
    },
    variants: {
      hasOverlay: {
        true: {},
        false: {
          overlay: ["backdrop-blur-none", "bg-transparent"],
        },
      },
      fullPage: {
        true: {
          content: ["h-full"],
          overlay: ["!p-0"],
        },
      },
      overflow: {
        outside: {},
        inside: {
          content: ["max-h-full"],
          body: [
            "overflow-auto",
            "py-0.5", // To avoid scrollbar when content is not overflowing
          ],
        },
      },
      fullscreen: {
        true: {
          overlay: ["overflow-hidden"],
          content: ["max-w-none", "h-full", "overflow-y-auto", "py-5"],
          header: ["px-4"],
          body: ["px-4"],
          footer: ["px-4"],
          close: ["top-3", "right-3", "h-10", "w-10"],
        },
        false: {
          overlay: ["p-5", "sm:p-10"],
          content: [],
        },
      },
      variant: {
        default: {},
        command: {
          close: [
            "right-2.5",
            "top-3",
            "sm:right-4",
            "sm:top-3",
            "bg-surface-base",
          ],
        },
      },
      // Use disableCenterY if content is longer than screen height, causing content clipping
      disableCenterY: {
        true: {
          overlay: ["items-start"],
        },
        false: {
          overlay: ["items-center"],
        },
      },
    },
    defaultVariants: {
      fullPage: false,
      fullscreen: false,
      variant: "default",
      disableCenterY: false,
      hasOverlay: true,
    },
  },
  { responsiveVariants: ["sm", "md", "lg"] },
);
export type ModalVariants = VariantProps<typeof modalTheme>;
