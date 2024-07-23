'use client';
import VerificationInput, { VerificationInputProps } from 'react-verification-input';

import { codeInputVariant } from './CodeInput.theme';

export interface CodeInputProps extends VerificationInputProps {}

export const CodeInput = ({ ...props }: CodeInputProps) => {
    const { container, inputs } = codeInputVariant();

    return (
        <VerificationInput
            containerProps={{ className: container() }}
            inputProps={{ className: inputs() }}
            placeholder=""
            validChars="0-9"
            {...props}
        />
    );
};
