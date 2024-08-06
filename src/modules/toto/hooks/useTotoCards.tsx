import { useState, useEffect } from "react";

import { TotoCardProps } from "@/modules/toto/components/TotoCard";

export const useTotoCards = () => {
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
                console.error('An error occured in obtaining your TOTO tickets', error);
            }
        };
        fetchTotoCards();
    }, []);

    return { TotoCards };
}