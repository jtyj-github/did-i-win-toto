'use client';
import { useState, useEffect } from 'react';

import { Button } from '@/common/components/Button';
import { Heading } from '@/common/components/Heading';
import { Main } from '@/common/components/Layout';

import { TotoCard, TotoCardProps } from '@/modules/toto/components/TotoCard';

export default function Home() {
    const [TotoCards, setTotoCards] = useState<TotoCardProps[]>([]);

    useEffect(() => {
        const fetchTotoCards = async () => {
            try {
                const response = await fetch('/api/tickets/cards', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to obtain TOTO tickets');
                }

                const data = await response.json();
                console.log(data);
                setTotoCards(data.data);

            } catch (error) {
                console.error('An error occured in obtaining your TOTO tickets',error);
            
            }
        }
        fetchTotoCards();
    }, []);
    
    const USER_HAS_SUBMITTED_TICKET = true;
    const MY_SUBMITTED_TICKET = {
        drawNumber: 3391,
        number: [1, 2, 3, 4, 5, 7, 14],
    };
    
    const MOCK_POST =  {
        userId: '1234-5678',
        numbers: [1, 2, 3, 4, 5, 6],
        type: 'SYSTEM6'
    }
    const handleSubmitTicket = () => {
        // TODO: Implement submit ticket
        // TODO: open modal to submit ticket
    };

    return (
        <Main className="gap-4">
            <div className="flex justify-between">
                <Heading as="h1" className="text-2xl font-bold">
                    Home
                </Heading>
                <Button onClick={handleSubmitTicket}>Submit my ticket</Button>
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
                {TotoCards.map((totoCard, index) => (
                    <TotoCard key={index} {...totoCard} />
                ))}
            </div>
        </Main>
    );
}
