import { tv, type VariantProps } from "tailwind-variants";

export const segmentedControlTheme = tv({
  slots: {
    wrapper: ["flex", "gap-1"],
    button: ["rounded-none"],
  },
  variants: {
    style: {
      default: [],
      connected: {
        wrapper: [
          "gap-0",
          "rounded-md",
          "w-fit",
          "overflow-hidden",
          "border-border-base",
          "border",
        ],
      },
    },
    vertical: {
      true: {
        wrapper: ["flex-col"],
      },
    },
  },
  defaultVariants: {
    style: "default",
  },
});

export type SegmentedControlVariants = VariantProps<
  typeof segmentedControlTheme
>;
