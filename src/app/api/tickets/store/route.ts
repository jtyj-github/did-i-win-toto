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
            return Response.json(
                { message: 'Ticket successfully created'},
                { status: 200 }
            );
        }
    catch (error) {
        console.error('Error creating ticket:', error);
        return Response.json(
            { message: 'Error creating ticket', error: error},
            { status: 500 }
        );
    }
};

/** 
import prisma from '@/common/lib/prisma';
import { NextRequest, Response } from 'next/server';

export async function POST(req: NextRequest) {  
    const { userId, numbers, type } = await req.json();

    const newTicket = await prisma.totoTicket.create({
        data: {
            numbers,
            type,
            uuid: userId
        }
    })
    return Response.json({message: "Ticket successfully created", data: {newTicket}}, {status : 200})
}
*/
