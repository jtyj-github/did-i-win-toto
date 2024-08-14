'use client';
import { Button } from '@/common/components/Button';
import { Heading } from '@/common/components/Heading';
import { Main } from '@/common/components/Layout';

import { TotoCard, } from '@/modules/toto/components/TotoCard';
import { useTotoCards } from '@/modules/toto/hooks/useTotoCards';
import { useTotoSubmissionModal } from '@/modules/toto/hooks/useTotoSubmissionModal';
import { useUserCards } from '@/modules/toto/hooks/useUserCards';

export default function Home() {
    const { TotoCards } = useTotoCards();

    const test = useUserCards();
    console.log(test);

    //TODO: Incorporate this into the useUserCards hook
    const USER_HAS_SUBMITTED_TICKET = true;
    
    //TODO: Change this to the actual ticket submitted by the user
    const MY_SUBMITTED_TICKET = {
        "userTickets": [
            {
                "drawNumbers": [
                    14,
                    5,
                    3,
                    7,
                    1,
                    42,
                    32
                ],
                "type": "SYSTEM7",
                "uuid": "c9b277b9-ca15-43be-97cc-88f407814acc"
            },
            {
                "drawNumbers": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
                "type": "SYSTEM6",
                "uuid": "c9b277b9-ca15-43be-97cc-88f407814acc"
            }
        ],
    }

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
                        My Tickets
                    </Heading>
                    <div className="space-y-4 rounded-xl border border-element-primary bg-surface-elevated p-3">
                        {MY_SUBMITTED_TICKET && (
                            <div>
                                {MY_SUBMITTED_TICKET.userTickets.map((ticket, ticketIndex) => (
                                    <div key={ticketIndex} className="flex flex-row justify-evenly py-3">
                                    {ticket.drawNumbers.map((num, index) => (
                                    <div key={index} className="grid h-8 w-8 place-content-center">
                                        <Heading as="h2" className="font-mono text-3xl font-bold">
                                            {num}
                                        </Heading>
                                    </div>
                                    ))}
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
