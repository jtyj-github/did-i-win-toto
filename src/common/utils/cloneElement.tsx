import React, {
    ReactElement,
    isValidElement,
    Children,
    cloneElement as reactCloneElement,
    HTMLProps,
    ReactNode
} from 'react';
import { ClassProp } from 'tailwind-variants';

interface CloneElementProps extends HTMLProps<ReactNode> {
    element: ReactNode;
    themeStyle?: (props: ClassProp) => string;
}

export const cloneElement = ({ element, themeStyle, ...props }: CloneElementProps) => {
    if (isValidElement(element)) {
        return (
            <>
                {Children.map(element, (child) => {
                    const originalClassName = (child.props as HTMLProps<ReactNode>)?.className;

                    return reactCloneElement(child as ReactElement, {
                        className: themeStyle
                            ? themeStyle({
                                  className: originalClassName // overriding icon classNames
                              })
                            : originalClassName,
                        ...props
                    });
                })}
            </>
        );
    }
    return <></>;
};
