// Implement uuid to identify which ticket belongs to which user

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/common/lib/prisma';

const storeUserTicket = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        console.log(req.body);
        const userTicket = await prisma.totoTicket.create({
            data: {
                numbers: req.body.numbers,
                type: req.body.type,
                date: req.body.date,
                uuid: req.body.uuid
            }
        })
        console.log(userTicket);
        res.status(200).json({message: 'Ticket Successfully Stored'});
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default storeUserTicket;