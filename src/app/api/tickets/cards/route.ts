import { readStores } from "@/common/utils/readWriteStores"

import { TotoCardProps } from "@/modules/toto/components/TotoCard";

const fileName = 'sg_lottery.json';

export const GET = async () => {

    try {
        const output = readStores<TotoCardProps>(`/${fileName}`, 'uploads');
    
        return Response.json({
            message: 'Successfully retrieved lottery data',
            data: output,
            status: 200
        })     
    } catch (error) {
        return Response.json({
            message: 'Error retrieving lottery data',
            error: error,
            status: 500
        })
    }
}