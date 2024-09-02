import prisma from '@/common/lib/prisma';

export const POST = async (req: Request) => {
    const { userId } = await req.json();
    
    // TODO: Include catch for calling without userId

    try {
        const userTickets = await prisma.totoTicket.findMany({
            where: {
                uuid: userId
            }
        });
        return Response.json({
            message: 'Ticket Successfully Retrieved',
            data: { userTickets }
        });
    } catch (error) {
        return Response.json({
            message: 'Error retrieving ticket',
            error: error
        });
    }
};
