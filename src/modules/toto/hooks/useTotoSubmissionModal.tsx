import { useState } from 'react';

import { Button } from '@/common/components/Button';
import { Field } from '@/common/components/Field';
import { Input } from '@/common/components/Input';
import { Modal, ModalProps } from '@/common/components/Modal';
import { useToast } from '@/common/components/Toast';

import { useUser } from '@/modules/toto/hooks/useUser';

export interface UseTotoSubmissionModalProps extends Omit<ModalProps, 'onSubmit'> {
    onSubmit?: (value: string) => void;
}

export const useTotoSubmissionModal = ({ onSubmit, ...props }: UseTotoSubmissionModalProps) => {
    const [visible, setVisible] = useState(false);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [value5, setValue5] = useState('');

    const { toast } = useToast();

    const onOpen = () => setVisible(true);
    const onClose = () => setVisible(false);
    const onOpenChange = () => setVisible((prev) => !prev);
    const userId = useUser();

    const handleOnClick = () => {
        if (onSubmit) {
            // TODO: add validation
            if (!value1 || !value2 || !value3 || !value4 || !value5) {
                toast({
                    title: 'Oh no!',
                    description: 'Please enter all 5 numbers',
                    variant: 'error'
                });
                return;
            }
            // TODO: choose what value format do you want
            const value = [value1, value2, value3, value4, value5].join(',');
            onSubmit(value);
            // TODO: Option for user to select type of ticket

            // call fetch to submit ticket
            fetch('/api/tickets/store', {
                method: 'POST',
                body: JSON.stringify({ userId, numbers: value, type: 'SYSTEM6' })
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

            setValue1('');
            setValue2('');
            setValue3('');
            setValue4('');
            setValue5('');
        }
        onClose();
    };
    const renderModal = (
        <Modal open={visible} onOpenChange={onOpenChange} {...props}>
            <Modal.Content>
                <Modal.Header>Submit Toto Ticket</Modal.Header>
                <Modal.Body>
                    <form className="flex flex-col gap-10">
                        <Field label="Enter toto number">
                            <div className="flex justify-between gap-2">
                                <Input
                                    className="max-w-12 text-center text-4xl"
                                    contentProps={{ className: 'h-20 max-h-20' }}
                                    id="value-1"
                                    max={49}
                                    min={1}
                                    type="number"
                                    value={value1}
                                    onChange={(e) => setValue1(e.target.value)}
                                />
                                <Input
                                    className="max-w-12 text-center text-4xl"
                                    contentProps={{ className: 'h-20 max-h-20' }}
                                    id="value-2"
                                    max={49}
                                    min={1}
                                    type="number"
                                    value={value2}
                                    onChange={(e) => setValue2(e.target.value)}
                                />
                                <Input
                                    className="max-w-12 text-center text-4xl"
                                    contentProps={{ className: 'h-20 max-h-20' }}
                                    id="value-3"
                                    max={49}
                                    min={1}
                                    type="number"
                                    value={value3}
                                    onChange={(e) => setValue3(e.target.value)}
                                />
                                <Input
                                    className="max-w-12 text-center text-4xl"
                                    contentProps={{ className: 'h-20 max-h-20' }}
                                    id="value-4"
                                    max={49}
                                    min={1}
                                    type="number"
                                    value={value4}
                                    onChange={(e) => setValue4(e.target.value)}
                                />
                                <Input
                                    className="max-w-12 text-center text-4xl"
                                    contentProps={{ className: 'h-20 max-h-20' }}
                                    id="value-5"
                                    max={49}
                                    min={1}
                                    type="number"
                                    value={value5}
                                    onChange={(e) => setValue5(e.target.value)}
                                />
                            </div>
                        </Field>

                        <Button onClick={handleOnClick}>Submit</Button>
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
