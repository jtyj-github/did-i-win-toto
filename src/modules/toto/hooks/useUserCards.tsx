import { useState, useEffect } from 'react';

import { UserCardProps } from '@/modules/toto/components/TotoCard';

export const useUserCards = (userId: string) => {
    const [userCards, setUserCards] = useState<UserCardProps>({ userTickets: [] });

    useEffect(() => {
        if (userId) {
            fetch('/api/tickets', { method: 'POST', body: JSON.stringify({ userId }) })
                .then((response) => response.json())
                .then((response) => setUserCards(response.data))
                .catch((error) =>
                    console.error('An error occured in obtaining your TOTO tickets', error)
                );
        }
    }, [userId]);

    return userCards;
};
