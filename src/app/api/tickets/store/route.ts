import { NextApiResponse } from 'next';

import prisma from '@/common/lib/prisma';

export const POST = async (req: Request, res: NextApiResponse) => {
    const { userId, numbers, type } = await req.json();

    try {
        await prisma.totoTicket.create({
            data: {
                numbers,
                type,
                uuid: userId
            }
        });

        res.status(200).json({ message: 'Ticket successfully stored.' });
    } catch (error) {
        res.status(500).json({ message: 'Error while storing ticket.', error });
    }
};
