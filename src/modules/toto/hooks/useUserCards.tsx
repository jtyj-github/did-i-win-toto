import { useState, useEffect } from 'react';

import { UserCardProps } from '@/modules/toto/components/TotoCard';
import { useUser } from '@/modules/toto/hooks/useUser';

export const useUserCards = () => {
    const [userCards, setUserCards] = useState<UserCardProps[]>([]);
    const userId = useUser();

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
