import main from '@/app/api/scrape';

export const GET = async () => {
    try {
        const output = await main();

        return Response.json({
            message: 'Successfully retrieved lottery data',
            data: output,
            status: 200
        });
    } catch (error) {
        return Response.json({
            message: 'Error retrieving lottery data',
            status: 500
        })
    }
}