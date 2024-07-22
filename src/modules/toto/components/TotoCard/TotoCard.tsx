import { ComponentPropsWithoutRef } from 'react';

import { Heading } from '@/common/components/Heading';
import { formatAmount } from '@/common/utils';

export type WinningPool = {
    winningGroup: number;
    winningPrize?: number;
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
                    <Heading as="h3" className="text-sm">
                        Draw <span className="font-bold">#{drawNumber}</span>
                    </Heading>
                    <Heading as="h3" className="text-sm">
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
                            className="font-mono text-2xl font-bold text-element-primary">
                            {num}
                        </Heading>
                    </div>
                ))}
                <div className="grid h-8 w-8 place-content-center">
                    <Heading
                        as="h2"
                        className="font-mono text-2xl font-bold text-element-secondary">
                        {additionalNum}
                    </Heading>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {winningPool.map((pool, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <Heading as="h3" className="w-20 text-center text-sm">
                            {`Group ${pool.winningGroup}`}
                        </Heading>
                        <Heading as="h3" className="text-center text-sm">
                            {pool.winningPrize ? formatAmount(pool.winningPrize) : '-'}
                        </Heading>
                        <Heading as="h3" className="w-20 text-center text-sm">
                            {pool.winners ? formatAmount(pool.winners, { style: 'decimal' }) : '-'}
                        </Heading>
                    </div>
                ))}
            </div>
        </div>
    );
};
