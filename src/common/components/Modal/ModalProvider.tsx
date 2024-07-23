import { createContext, useContext, type PropsWithChildren } from 'react';

import { type ModalProps } from './Modal';
import { modalTheme, type ModalVariants } from './Modal.theme';

export interface ModalProviderProps extends Partial<ModalVariants>, ModalProps {}

type ModalProviderContext = ReturnType<typeof useModalValues>;

const ModalContext = createContext<ModalProviderContext | undefined>(undefined);

// For inferring return type
const useModalValues = (props: ModalProviderProps) => {
    const theme = modalTheme({
        fullPage: props.fullPage,
        fullscreen: props.fullscreen,
        variant: props.variant,
        overflow: props.overflow,
        disableCenterY: props.disableCenterY,
        hasOverlay: props.hasOverlay
    });

    return {
        ...props,
        theme
    };
};

export const ModalProvider = ({
    children,
    ...props
}: PropsWithChildren<ModalProviderProps>): JSX.Element => {
    const values = useModalValues(props);

    return <ModalContext.Provider value={values}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal was used outside of its Provider');
    }
    return context;
};

export default ModalProvider;
