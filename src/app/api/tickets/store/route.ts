import prisma from '@/common/lib/prisma';

export const POST = async (req: Request) => {
    const { userId, numbers, type } = await req.json();

    try {
        const newTicket = await prisma.totoTicket.create({
            data: {
                numbers,
                type,
                uuid: userId
            }
        });
        return Response.json({
            message: 'Ticket successfully created',
            data: { newTicket }
        });
    } catch (error) {
        return Response.json({
            message: 'Error creating ticket',
            error: error
        });
    }
};