'use client';
import { Button } from '@/common/components/Button';
import { Heading } from '@/common/components/Heading';
import { Main } from '@/common/components/Layout';

import { TotoCard } from '@/modules/toto/components/TotoCard';
import { useTotoCards } from '@/modules/toto/hooks/useTotoCards';
import { useTotoSubmissionModal } from '@/modules/toto/hooks/useTotoSubmissionModal';
import { useUser } from '@/modules/toto/hooks/useUser';
import { useUserCards } from '@/modules/toto/hooks/useUserCards';

export default function Home() {
    const userId = useUser();
    const { TotoCards } = useTotoCards();
    let USER_HAS_SUBMITTED_TICKET = false;

    // user submitted ticket
    const MY_SUBMITTED_TICKET = useUserCards(userId);
    console.log(MY_SUBMITTED_TICKET);
    if (MY_SUBMITTED_TICKET.userTickets.length > 0) {
        USER_HAS_SUBMITTED_TICKET = true;
    }

    const { onOpen, renderModal } = useTotoSubmissionModal({}, userId);

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
                                    <div
                                        key={ticketIndex}
                                        className="flex flex-row justify-evenly py-3">
                                        {ticket.numbers.map((num, index) => (
                                            <div
                                                key={index}
                                                className="grid h-8 w-8 place-content-center">
                                                <Heading
                                                    as="h2"
                                                    className="font-mono text-3xl font-bold">
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
