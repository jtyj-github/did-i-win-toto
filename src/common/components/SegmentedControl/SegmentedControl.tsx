import { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button, ButtonProps } from "@/common/components/Button";
import {
  segmentedControlTheme,
  SegmentedControlVariants,
} from "@/common/components/SegmentedControl/SegmentedControl.theme";

interface Option extends ButtonProps {
  value: string;
  label: string;
}

/**
 * Props for the SegmentedControl component.
 *
 * @interface SegmentedControlProps
 * @extends ComponentPropsWithoutRef<'div'>
 */
export interface SegmentedControlProps
  extends Omit<ComponentPropsWithoutRef<"div">, "style">,
    SegmentedControlVariants {
  /**
   * An array of options to be displayed in the segmented control.
   *
   * @type {Option[]}
   * @memberof SegmentedControlProps
   */
  options: Option[];

  /**
   * The current selected value in the segmented control.
   *
   * @type {string}
   * @memberof SegmentedControlProps
   */
  value: string;

  /**
   * Callback function that is called when the value changes.
   *
   * @param {string} value - The new value selected in the segmented control.
   * @memberof SegmentedControlProps
   */
  onValueChange: (value: string) => void;

  /**
   * Use children to pass ReactNode into the same wrapper.
   *
   * @type {ReactNode}
   * @memberof SegmentedControlProps
   */
  children?: ReactNode;
}

export const SegmentedControl = ({
  children,
  options,
  value,
  onValueChange,
  className,
  ...variants
}: SegmentedControlProps) => {
  const { wrapper, button } = segmentedControlTheme({
    className,
    ...variants,
  });

  return (
    <div className={wrapper()}>
      {options.map((option) => (
        <Button
          key={option.value}
          className={button()}
          size="sm"
          variant={value === option.value ? "tertiary" : "ghost"}
          {...option}
          onClick={() => onValueChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
      {children}
    </div>
  );
};
