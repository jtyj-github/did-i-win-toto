import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/lib/prisma';

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, numbers, type } = await req.body;

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
