import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/common/lib/prisma';
import getUserId from '@/common/utils/getUserId';

const storeUserTicket = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const uuid = getUserId();
            const userTicket = await prisma.totoTicket.create({
                data: {
                    numbers: req.body.numbers,
                    type: req.body.type,
                    date: req.body.date,
                    uuid: uuid,
                }
            })
            res.status(200).json({message: 'Ticket Successfully Stored', data: {userTicket}});

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error storing ticket' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default storeUserTicket;