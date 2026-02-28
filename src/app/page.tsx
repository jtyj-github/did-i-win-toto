'use client';
import debounce from 'lodash/debounce';
import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/common/components/Button';
import { Heading } from '@/common/components/Heading';
import { Input } from '@/common/components/Input';
import { Main } from '@/common/components/Layout';

import { TotoCard } from '@/modules/toto/components/TotoCard';
import { useTotoCards } from '@/modules/toto/hooks/useTotoCards';
import { useTotoSubmissionModal } from '@/modules/toto/hooks/useTotoSubmissionModal';
import { useUser } from '@/modules/toto/hooks/useUser';
import { useUserCards } from '@/modules/toto/hooks/useUserCards';

const CARDS_PER_PAGE = 20;

export default function Home() {
    const userId = useUser();
    const { TotoCards, loading } = useTotoCards();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

    // fetch user submitted tickets
    const { userTickets } = useUserCards(userId);

    const { onOpen, renderModal } = useTotoSubmissionModal({}, userId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSetQuery = useCallback(
        debounce((query: string) => {
            setDebouncedQuery(query);
            setVisibleCount(CARDS_PER_PAGE);
        }, 300),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        debouncedSetQuery(e.target.value);
    };

    const filteredCards = useMemo(() => {
        if (!TotoCards || !debouncedQuery.trim()) return TotoCards;
        const query = debouncedQuery.trim().toLowerCase();
        return TotoCards.filter(
            (card) =>
                String(card.drawNumber).includes(query) ||
                card.drawDate.toLowerCase().includes(query)
        );
    }, [TotoCards, debouncedQuery]);

    const visibleCards = useMemo(() => {
        if (!filteredCards) return filteredCards;
        return filteredCards.slice(0, visibleCount);
    }, [filteredCards, visibleCount]);

    const hasMore = filteredCards && visibleCount < filteredCards.length;

    return (
        <Main className="gap-4">
            <section className="mx-auto w-full max-w-screen-lg px-4 py-10 md:px-8">
                <div className="flex justify-between">
                    <Heading as="h1" className="text-2xl font-bold">
                        Did I Win Toto ?
                    </Heading>
                    <Button onClick={onOpen}>Submit my ticket</Button>
                </div>
                {userTickets.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <Heading as="h1" className="text-lg font-bold">
                            My Tickets
                        </Heading>
                        <div className="space-y-4 rounded-xl border border-element-primary bg-surface-elevated p-3">
                            <div>
                                {userTickets.map((ticket, ticketIndex) => (
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
                        </div>
                    </div>
                )}
                <div className="mt-10">
                    <Input
                        id="search-draws"
                        placeholder="Search by draw number or date (e.g. 4155, Feb 2026)"
                        value={searchQuery}
                        variant="glass"
                        onChange={handleSearchChange}
                    />
                    {debouncedQuery.trim() && filteredCards && (
                        <p className="mt-2 text-sm text-text-em-high">
                            Showing {filteredCards.length} of {TotoCards?.length ?? 0} draws
                        </p>
                    )}
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {loading &&
                        Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-[320px] animate-pulse rounded-lg bg-blue-900/30"
                            />
                        ))}
                    {!loading &&
                        visibleCards &&
                        visibleCards.length > 0 &&
                        visibleCards.map((totoCard) => (
                            <TotoCard key={totoCard.drawNumber} {...totoCard} />
                        ))}
                </div>
                {hasMore && (
                    <div className="mt-4 flex justify-center">
                        <Button
                            variant="tertiary"
                            onClick={() => setVisibleCount((prev) => prev + CARDS_PER_PAGE)}>
                            Show more
                        </Button>
                    </div>
                )}
            </section>
            {renderModal}
        </Main>
    );
}
