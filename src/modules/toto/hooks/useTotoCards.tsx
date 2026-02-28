import { useState, useEffect } from "react";

import { TotoCardProps } from "@/modules/toto/components/TotoCard";

export const useTotoCards = () => {
    const [TotoCards, setTotoCards] = useState<TotoCardProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            fetch('/api/tickets/cards')
                .then(response => response.json())
                .then(response => {
                    setTotoCards(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('An error occured in obtaining TOTO draw results', error);
                    setLoading(false);
                });
        }, []
    );

    return { TotoCards, loading };
}