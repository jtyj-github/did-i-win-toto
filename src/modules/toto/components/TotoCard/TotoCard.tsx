import { ComponentPropsWithoutRef } from 'react';

import { Heading } from '@/common/components/Heading';
import { formatAmount } from '@/common/utils';

export type WinningPool = {
    group: string;
    prize?: number;
    winners?: number;
};

export type userCard = {
    numbers: number[];
    type: string;
    uuid: string;
};

export interface UserCardProps extends ComponentPropsWithoutRef<'div'> {
    userTickets: userCard[];
}

export interface TotoCardProps extends ComponentPropsWithoutRef<'div'> {
    drawNumber: number;
    drawDate: string;
    winningNum: number[];
    additionalNum: string;
    winningPool: WinningPool[];
}

export const TotoCard = ({
    drawNumber,
    drawDate,
    winningNum,
    additionalNum,
    winningPool,
    ...props
}: TotoCardProps) => {
    return (
        <div
            className="space-y-4 rounded-xl border border-border-base bg-surface-base px-6 py-3"
            {...props}>
            {/* Heading */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <Heading as="h3" className="text-xl">
                        Draw{' '}
                        <span className="ml-1 font-bold rounded-md border border-border-base px-2 py-1 bg-surface-elevated">
                            #{drawNumber}
                        </span>
                    </Heading>
                    <Heading as="h3" className="text-xs">
                        {drawDate}
                    </Heading>
                </div>
            </div>

            {/* Numbers */}
            <div className="flex justify-between px-0 py-2 lg:px-8">
                {winningNum.map((num, index) => (
                    <div key={index} className="grid h-8 w-8 place-content-center">
                        <Heading as="h2" className="font-mono text-3xl font-bold text-violet-400">
                            {num}
                        </Heading>
                    </div>
                ))}
                <div className="grid h-8 w-8 place-content-center">
                    <Heading as="h2" className="font-mono text-3xl font-bold text-emerald-400">
                        {additionalNum}
                    </Heading>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {winningPool.map((pool, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <Heading as="h3" className="w-20 text-center text-base">
                            {pool.group}
                        </Heading>
                        <Heading as="h3" className="text-center text-base">
                            {pool.prize ? formatAmount(pool.prize) : '-'}
                        </Heading>
                        <Heading as="h3" className="w-20 text-center text-base">
                            {pool.winners ? formatAmount(pool.winners, { style: 'decimal' }) : '-'}
                        </Heading>
                    </div>
                ))}
            </div>
        </div>
    );
};
