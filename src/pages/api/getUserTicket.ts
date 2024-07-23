import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/common/lib/prisma';
import getUserId from '@/common/utils/getUserId';

const getUserTicket = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const uuid = getUserId();
            const userTickets = await prisma.totoTicket.findMany({
                where: {
                    uuid: uuid
                }
            });

            res.status(200).json({ message: 'Ticket Successfully Retrieved', data: { userTickets }});
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving ticket' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default getUserTicket;