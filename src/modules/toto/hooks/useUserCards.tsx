import { useState, useEffect } from "react";

import { useUser } from '@/modules/toto/hooks/useUser';

import { TotoCardProps } from "../components/TotoCard";

export const useUserCards = () => {
    const [userCards, setUserCards] = useState<TotoCardProps[]>([]);
    const userId = useUser();

    useEffect(() => {
        fetch('/api/tickets', {method: "POST", body: JSON.stringify({userId})})
            .then(response => response.json())
            .then(response => setUserCards(response.data))
            .catch(error => console.error('An error occured in obtaining your TOTO tickets', error));
    })

    return { userCards };
}
