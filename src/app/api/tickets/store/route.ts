import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/common/lib/prisma';
import { useUser } from '@/common/hooks/useUser';

export async function POST(req: NextRequest) {
    try {
        const { numbers, type } = await req.json();

        // Ensure useUser is called client-side
        if (typeof window !== 'undefined') {
            const userId = useUser();

            const newTicket = await prisma.totoTicket.create({
                data: {
                    numbers,
                    type,
                    uuid: userId
                }
            });

            return NextResponse.json(
                { message: 'Ticket successfully created', data: { newTicket } },
                { status: 200 }
            );
        } else {
            throw new Error(
                'Window object is not defined. Ensure useUser is called on the client-side.'
            );
        }
    } catch (error) {
        console.error('Error creating ticket:', error);
        return NextResponse.json(
            { message: 'Error creating ticket', error: error},
            { status: 500 }
        );
    }
}

/** 
import prisma from '@/common/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {  
    const { userId, numbers, type } = await req.json();

    const newTicket = await prisma.totoTicket.create({
        data: {
            numbers,
            type,
            uuid: userId
        }
    })
    return NextResponse.json({message: "Ticket successfully created", data: {newTicket}}, {status : 200})
}
*/
