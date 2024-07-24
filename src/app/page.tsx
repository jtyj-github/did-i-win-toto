'use client';
import { Button } from '@/common/components/Button';
import { Heading } from '@/common/components/Heading';
import { Main } from '@/common/components/Layout';

import { TotoCard, TotoCardProps } from '@/modules/toto/components/TotoCard';

export default function Home() {
    const MOCK_TOTO_CARDS: TotoCardProps[] = [
        {
            drawNumber: 3390,
            drawDate: 'Thu, 11 July 2024',
            winningNum: [1, 2, 3, 4, 5, 6],
            additionalNum: '7',
            winningPool: [
                {
                    winningGroup: 1,
                    winningPrize: 2934077,
                    winners: 1
                },
                {
                    winningGroup: 2,
                    winningPrize: 66746,
                    winners: 9
                },
                {
                    winningGroup: 3,
                    winningPrize: 564,
                    winners: 733
                },
                {
                    winningGroup: 4,
                    winningPrize: 249,
                    winners: 906
                },
                {
                    winningGroup: 5,
                    winningPrize: 50,
                    winners: 25949
                },
                {
                    winningGroup: 6,
                    winningPrize: 25,
                    winners: 19667
                },
                {
                    winningGroup: 7,
                    winningPrize: 10,
                    winners: 337545
                }
            ]
        },
        {
            drawNumber: 3389,
            drawDate: 'Thu, 4 July 2024',
            winningNum: [22, 33, 41, 15, 6, 47],
            additionalNum: '8',
            winningPool: [
                {
                    winningGroup: 1,
                    winningPrize: undefined,
                    winners: undefined
                },
                {
                    winningGroup: 2,
                    winningPrize: 186640,
                    winners: 2
                },
                {
                    winningGroup: 3,
                    winningPrize: 2087,
                    winners: 123
                },
                {
                    winningGroup: 4,
                    winningPrize: 441,
                    winners: 318
                },
                {
                    winningGroup: 5,
                    winningPrize: 50,
                    winners: 6913
                },
                {
                    winningGroup: 6,
                    winningPrize: 25,
                    winners: 10878
                },
                {
                    winningGroup: 7,
                    winningPrize: 10,
                    winners: 135842
                }
            ]
        }
    ];

    const USER_HAS_SUBMITTED_TICKET = true;
    const MY_SUBMITTED_TICKET = {
        drawNumber: 3391,
        number: [1, 2, 3, 4, 5, 14],
        additionalNum: '7'
    };

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
                                <div className="grid h-8 w-8 place-content-center">
                                    <Heading as="h2" className="font-mono text-3xl font-bold">
                                        {MY_SUBMITTED_TICKET.additionalNum}
                                    </Heading>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="mt-10 flex flex-col gap-4">
                {MOCK_TOTO_CARDS.map((totoCard, index) => (
                    <TotoCard key={index} {...totoCard} />
                ))}
            </div>
        </Main>
    );
}
