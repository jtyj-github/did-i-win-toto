import { ComponentPropsWithoutRef } from 'react';

import { Heading } from '@/common/components/Heading';
import { formatAmount } from '@/common/utils';

export type WinningPool = {
    group: string;
    prize?: number;
    winners?: number;
};

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
            className="space-y-4 rounded-xl border border-border-base bg-surface-base p-3"
            {...props}>
            {/* Heading */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <Heading as="h3" className="text-xl">
                        Draw <span className="font-bold">#{drawNumber}</span>
                    </Heading>
                    <Heading as="h3" className="text-xl">
                        {drawDate}
                    </Heading>
                </div>
            </div>

            {/* Numbers */}
            <div className="flex justify-between px-8 py-2">
                {winningNum.map((num, index) => (
                    <div key={index} className="grid h-8 w-8 place-content-center">
                        <Heading
                            as="h2"
                            className="font-mono text-3xl font-bold text-element-primary">
                            {num}
                        </Heading>
                    </div>
                ))}
                <div className="grid h-8 w-8 place-content-center">
                    <Heading
                        as="h2"
                        className="font-mono text-3xl font-bold text-element-secondary">
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
