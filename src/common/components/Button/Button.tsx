import Link from 'next/link';
import {
    Children,
    cloneElement,
    ComponentPropsWithoutRef,
    ComponentPropsWithRef,
    forwardRef,
    HTMLProps,
    isValidElement,
    ReactElement,
    Ref,
    useCallback,
    type ReactNode
} from 'react';

import { Icon } from '@/common/components/CustomIcon';
import { cn } from '@/common/utils/cn';

import {
    buttonIconTheme,
    ButtonIconVariants,
    buttonTheme,
    type ButtonVariants
} from './Button.theme';

export interface ButtonBaseProps extends ButtonVariants {
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    isResponsive?: boolean;
    loading?: boolean;
    asChild?: boolean;
    spanProps?: ComponentPropsWithoutRef<'span'>;
}

export interface ButtonLinkProps extends ComponentPropsWithRef<'a'> {
    as?: 'a';
    external?: boolean;
    href: string;
    disabled?: boolean;
}

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
    as?: 'button';
}

// Discriminated union based on "as" prop
export type ButtonOrLinkProps = (ButtonLinkProps | ButtonProps) & ButtonBaseProps;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonOrLinkProps>(
    (
        {
            children,
            iconLeft,
            iconRight,
            iconOnly,
            className,
            loading = false,
            asChild = false,
            variant = 'primary',
            size = 'md',
            smSize,
            mdSize,
            fullWidth = false,
            destructive = false,
            spanProps,
            ...props
        },
        ref
    ) => {
        // Conditionally render between <NextLink>, <a> or <button> depending on props
        // useCallback to prevent unnecessary re-rendering
        const Component = useCallback(
            ({ children: _children, ..._props }: ButtonOrLinkProps) => {
                // Keep button as as=button if disabled to allow onClick override
                if (_props.as === 'a' && !props.disabled) {
                    const { external, href, as: _as, ...baseLinkProps } = _props;

                    // External link
                    if (external) {
                        const externalLinkProps = {
                            target: '_blank',
                            rel: 'noopener',
                            href,
                            ...baseLinkProps
                        };
                        return (
                            <a {...externalLinkProps} ref={ref as Ref<HTMLAnchorElement>}>
                                {_children}
                            </a>
                        );
                    }

                    return (
                        <Link {...baseLinkProps} ref={ref as Ref<HTMLAnchorElement>} href={href}>
                            {_children}
                        </Link>
                    );
                } else {
                    const { as: _as, ...buttonProps } = _props;
                    return (
                        <button
                            {...(buttonProps as ButtonProps)}
                            ref={ref as Ref<HTMLButtonElement>}>
                            {_children}
                        </button>
                    );
                }
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [props.disabled]
        );

        // throw error to pass aria-label if button is icon only
        if (typeof children === 'undefined' && !props['aria-label']) {
            throw new Error(
                'Button must have a label if it is icon only. Please add an aria-label prop.'
            );
        }

        const _iconOnly =
            iconOnly || !!((iconLeft || iconRight) && typeof children === 'undefined');

        const StyledIcon = useCallback(
            ({ icon }: { icon: ReactNode }) => {
                if (isValidElement(icon)) {
                    return Children.map(icon, (child) => {
                        const originalClassName = (child.props as HTMLProps<HTMLOrSVGElement>)
                            ?.className;
                        return cloneElement(child as ReactElement, {
                            className: buttonIconTheme({
                                variant,
                                size,
                                smSize,
                                mdSize,
                                destructive,
                                className: originalClassName // overriding icon classNames
                            } as ButtonIconVariants)
                        });
                    });
                }
                return <></>;
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [children, size]
        );

        const Child = useCallback(() => {
            if (asChild) {
                return children;
            }
            return (
                <>
                    <StyledIcon icon={iconLeft} />
                    {children && <span {...spanProps}>{children}</span>}
                    <StyledIcon icon={iconRight} />
                </>
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [StyledIcon, iconLeft, iconRight, children, asChild]);

        const disableOnClickProp = {
            // ...((props.loading || props.disabled) && { onClick: undefined }),
            ...((loading ?? props.disabled) && {
                onClick: undefined
            })
        };

        return (
            <Component
                {...props}
                {...disableOnClickProp}
                className={buttonTheme({
                    variant,
                    size,
                    fullWidth,
                    destructive,
                    loading,
                    className: cn('inline-flex leading-none', className), // somehow the class is not read from tv
                    iconOnly: _iconOnly,
                    smSize,
                    mdSize
                })}
                data-disabled={props.disabled ? '' : undefined}>
                <Child />
                {loading && (
                    <span className="loading absolute inset-0 grid place-content-center">
                        <Icon className="animate-spin" icon="gg:spinner" />
                    </span>
                )}
            </Component>
        );
    }
);

Button.displayName = 'Button';
