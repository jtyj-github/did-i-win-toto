import { ComponentPropsWithoutRef, ReactNode } from "react";

import { fieldTheme, type FieldVariants } from "./Field.theme";

import { cn } from "@/common/functions";

export interface FieldProps {
  label?: string;
  message?: ReactNode;
  error?: boolean;
}

export interface FieldFullProps
  extends FieldProps,
    ComponentPropsWithoutRef<"div">,
    FieldVariants {
  labelProps?: ComponentPropsWithoutRef<"label">;

  htmlFor?: string;
}

export const Field = ({
  label,
  children,
  message,
  error,
  labelProps,
  size,
  className,
  htmlFor,
  ...props
}: FieldFullProps) => {
  const {
    wrapper,
    label: labelStyle,
    message: messageStyle,
  } = fieldTheme({ className, size });
  return (
    <div {...props} className={cn(wrapper(), className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          {...labelProps}
          className={labelStyle({ className: labelProps?.className })}
        >
          {label}
        </label>
      )}
      {children}
      {message && (
        <p className={messageStyle()} data-error={error ? "" : undefined}>
          {message}
        </p>
      )}
    </div>
  );
};
