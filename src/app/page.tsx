'use client';
import { Button } from '@/common/components/Button';
import { Heading } from '@/common/components/Heading';
import { Main } from '@/common/components/Layout';

import { TotoCard, } from '@/modules/toto/components/TotoCard';
import { useTotoCards } from '@/modules/toto/hooks/useTotoCards';
import { useTotoSubmissionModal } from '@/modules/toto/hooks/useTotoSubmissionModal';

export default function Home() {
    const { TotoCards } = useTotoCards();


    const USER_HAS_SUBMITTED_TICKET = true;
    
    //TODO: Change this to the actual ticket submitted by the user
    const MY_SUBMITTED_TICKET = {
        drawNumber: 3391,
        number: [1, 2, 3, 4, 5, 7, 14]
    };

    const MOCK_POST = {
        userId: '1234-5678',
        numbers: [1, 2, 3, 4, 5, 6],
        type: 'SYSTEM6'
    };
    const handleSubmitTicket = (value: string) => {
        // TODO: Implement submit ticket
        console.log({ value });
    };

    const { onOpen, renderModal } = useTotoSubmissionModal({
        onSubmit: handleSubmitTicket
    });

    return (
        <Main className="gap-4">
            <div className="flex justify-between">
                <Heading as="h1" className="text-2xl font-bold">
                    Home
                </Heading>
                <Button onClick={onOpen}>Submit my ticket</Button>
            </div>
            {USER_HAS_SUBMITTED_TICKET && (
                <div className="flex flex-col gap-4">
                    <Heading as="h1" className="text-lg font-bold">
                        My ticket for draw #{MY_SUBMITTED_TICKET.drawNumber}
                    </Heading>
                    <div className="space-y-4 rounded-xl border border-element-primary bg-surface-elevated p-3">
                        {MY_SUBMITTED_TICKET && (
                            <div className="flex justify-between px-8 py-2">
                                {MY_SUBMITTED_TICKET.number.map((num, index) => (
                                    <div key={index} className="grid h-8 w-8 place-content-center">
                                        <Heading as="h2" className="font-mono text-3xl font-bold">
                                            {num}
                                        </Heading>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="mt-10 flex flex-col gap-4">
                {TotoCards &&
                    TotoCards.length > 0 &&
                    TotoCards.map((totoCard, index) => <TotoCard key={index} {...totoCard} />)}
            </div>
            {renderModal}
        </Main>
    );
}
