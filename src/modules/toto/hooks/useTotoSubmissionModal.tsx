import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/common/components/Button';
import { Icon } from '@/common/components/CustomIcon';
import { DropdownMenu } from '@/common/components/DropdownMenu';
import { Field } from '@/common/components/Field';
import { Input } from '@/common/components/Input';
import { Modal, ModalProps } from '@/common/components/Modal';
import { useToast } from '@/common/components/Toast';
import { SystemType } from '@/common/types/toto';

export interface UseTotoSubmissionModalProps extends Omit<ModalProps, 'onSubmit'> {}

const totoInputSchema = z.object({
    values: z
        .array(
            z.object({
                number: z.coerce
                    .number()
                    .gte(1, 'Cannot be lower than 1')
                    .lte(49, 'Cannot be greater than 49')
                    .int()
            })
        )
        .superRefine((data, ctx) => {
            data.some(({ number }, index) => {
                if (
                    data
                        .slice(index + 1)
                        .some(
                            ({ number: otherNumber }) =>
                                number !== 0 && otherNumber !== 0 && number === otherNumber
                        )
                ) {
                    ctx.addIssue({
                        message: 'Duplicate number found',
                        code: z.ZodIssueCode.custom
                    });
                    return z.NEVER;
                }
            });

            return true;
        })
});
type TotoInputSchema = z.infer<typeof totoInputSchema>;

const options: { [key: string]: { label: string; value: string; numOfInputs: number } } = {
    ORDINARY: {
        label: 'Ordinary',
        value: SystemType.ORDINARY,
        numOfInputs: 6
    },
    SYSTEM7: {
        label: 'System 7',
        value: SystemType.SYSTEM7,
        numOfInputs: 7
    },
    SYSTEM8: {
        label: 'System 8',
        value: SystemType.SYSTEM8,
        numOfInputs: 8
    },
    SYSTEM9: {
        label: 'System 9',
        value: SystemType.SYSTEM9,
        numOfInputs: 9
    },
    SYSTEM10: {
        label: 'System 10',
        value: SystemType.SYSTEM10,
        numOfInputs: 10
    },
    SYSTEM11: {
        label: 'System 11',
        value: SystemType.SYSTEM11,
        numOfInputs: 11
    },
    SYSTEM12: {
        label: 'System 12',
        value: SystemType.SYSTEM12,
        numOfInputs: 12
    },
    SYSTEMROLL: {
        label: 'System Roll',
        value: SystemType.SYSTEMROLL,
        numOfInputs: 5
    }
};

export const useTotoSubmissionModal = (
    { ...props }: UseTotoSubmissionModalProps,
    userId: string
) => {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState(SystemType.ORDINARY);

    const {
        control,
        handleSubmit,
        formState: { isValid, errors }
    } = useForm<TotoInputSchema>({
        defaultValues: {
            values: []
        },
        mode: 'onChange',
        resolver: zodResolver(totoInputSchema)
    });
    const { fields, update, replace } = useFieldArray({
        control,
        name: 'values'
    });

    useEffect(() => {
        const numOfInputs = options[type].numOfInputs;
        replace(Array.from({ length: numOfInputs }, () => ({ number: 0 })));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, visible]);

    const { toast } = useToast();

    const onOpen = () => setVisible(true);
    const onClose = () => setVisible(false);
    const onOpenChange = () => setVisible((prev) => !prev);

    const onSubmit: SubmitHandler<TotoInputSchema> = (data) => {
        const value = data.values.map((field) => field.number);

        // call fetch to submit ticket
        fetch('/api/tickets/store', {
            method: 'POST',
            body: JSON.stringify({ userId, numbers: value, type })
        })
            .then((response) => response.json())
            .then(() => {
                // on successful submission
                toast({
                    title: 'Success!',
                    description: 'Toto successfully submitted',
                    variant: 'success'
                });
            })
            .catch(() => {
                // on failed submission
                toast({
                    title: 'Oh no!',
                    description: 'Failed to submit toto ticket',
                    variant: 'error'
                });
            });

        onClose();
    };

    const renderModal = (
        <Modal open={visible} onOpenChange={onOpenChange} {...props}>
            <Modal.Content>
                <Modal.Header>Submit Toto Ticket</Modal.Header>
                <Modal.Body>
                    <form
                        className="flex flex-col items-start gap-10"
                        onSubmit={handleSubmit(onSubmit)}>
                        {/* System select */}
                        <DropdownMenu>
                            <DropdownMenu.Trigger asChild>
                                <Button
                                    iconRight={<Icon icon="lucide:chevron-down" />}
                                    variant="tertiary">
                                    {options[type].label ?? 'Select Type'}
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                {Object.values(options).map((option) => (
                                    <DropdownMenu.Item
                                        key={option.value}
                                        onClick={() => setType(option.value as SystemType)}>
                                        {option.label}
                                    </DropdownMenu.Item>
                                ))}
                            </DropdownMenu.Content>
                        </DropdownMenu>

                        {/* Input fields */}
                        <Field
                            error={!!errors?.values?.message}
                            label="Enter toto number"
                            message={errors?.values?.message}>
                            <div className="flex flex-wrap gap-2">
                                {/* There's a bug where the ref shifts as user inputs anything */}
                                {/* this happens due to re-rendering of the fields on every input */}
                                {/* causing the focus to reset */}
                                {/* `autoFocus` is added as a temporary solution */}
                                {fields.map((field, index) => (
                                    <Controller
                                        key={field.id}
                                        control={control}
                                        name={`values.${index}` as const}
                                        render={() => (
                                            <Input
                                                autoFocus
                                                className="w-12 text-center text-4xl"
                                                contentProps={{ className: 'h-20 max-h-20' }}
                                                id={field.id}
                                                max={49}
                                                min={1}
                                                type="number"
                                                value={field.number === 0 ? '' : `${field.number}`}
                                                onChange={(e) => {
                                                    if (e.target.valueAsNumber < 1)
                                                        update(index, { number: 1 });
                                                    else if (e.target.valueAsNumber > 49)
                                                        update(index, { number: 49 });
                                                    else
                                                        update(index, {
                                                            number: e.target.valueAsNumber
                                                        });
                                                }}
                                            />
                                        )}
                                    />
                                ))}
                            </div>
                        </Field>

                        <Button disabled={!isValid} type="submit">
                            Submit
                        </Button>
                    </form>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );

    return {
        onOpen,
        onClose,
        renderModal
    };
};
