import { useState } from 'react';

import { Button } from '@/common/components/Button';
import { CodeInput } from '@/common/components/CodeInput';
import { Field } from '@/common/components/Field';
import { Modal, ModalProps } from '@/common/components/Modal';
import { useToast } from '@/common/components/Toast';

import { useUser } from '@/modules/toto/hooks/useUser';

export interface useTotoSubmissionModalProps extends Omit<ModalProps, 'onSubmit'> {
    onSubmit?: (value: string) => void;
}

export const useTotoSubmissionModal = ({ onSubmit, ...props }: useTotoSubmissionModalProps) => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');

    const { toast } = useToast();

    const onOpen = () => setVisible(true);
    const onClose = () => setVisible(false);
    const onOpenChange = () => setVisible((prev) => !prev);
    const userId = useUser();

    const handleOnClick = () => {
        if (onSubmit) {
            // TODO: add validation
            onSubmit(value);
            // TODO: Option for user to select type of ticket
            console.log(JSON.stringify({userId, numbers: value, type: 'SYSTEM6'}));
            fetch('/api/tickets/store', {method: 'POST', body: JSON.stringify({userId, numbers: value, type: 'SYSTEM6'})})
                .then(response => response.json())
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

            setValue('');
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
                            <CodeInput value={value} onChange={setValue} />
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
