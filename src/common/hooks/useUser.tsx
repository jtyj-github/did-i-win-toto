import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useUser = () => {
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        let userId = localStorage.getItem('userId');

        // If no userId is found in localStorage, create a new one
        // userId is a string. no parsing needed
        if (!userId) {
            userId = uuidv4();
            localStorage.setItem('userId', userId);
        }
        setUserId(userId);
    }, [userId]);

    return { userId };
};
