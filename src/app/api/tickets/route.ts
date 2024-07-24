import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/lib/prisma';

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = await req.body;

    try {
        const userTickets = await prisma.totoTicket.findMany({
            where: {
                uuid: userId
            }
        });

        res.status(200).json({
            message: 'Ticket Successfully Retrieved',
            data: { userTickets }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving ticket' });
    }
};
