import { type VariantProps, tv } from 'tailwind-variants';

export const codeInputVariant = tv({
    slots: {
        container: [],
        inputs: []
    }
});

export type CodeInputVariant = VariantProps<typeof codeInputVariant>;
