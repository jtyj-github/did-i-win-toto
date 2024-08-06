import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export const useUser = () => {
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        let userId = localStorage.getItem('userId');

        if (!userId) {
            userId = uuidv4();
            localStorage.setItem('userId', userId);
        }
        setUserId(userId);
    }, [userId]);

    return { userId };
}

