import { useState, useEffect } from "react";

import { TotoCardProps } from "@/modules/toto/components/TotoCard";

export const useTotoCards = () => {
    const [TotoCards, setTotoCards] = useState<TotoCardProps[]>([]);

    useEffect(() => {
            fetch('/api/tickets/cards')
                .then(response => response.json())
                .then(response => setTotoCards(response.data))
                .catch(error => console.error('An error occured in obtaining TOTO draw results', error));
        }, []
    );

    return { TotoCards };
}