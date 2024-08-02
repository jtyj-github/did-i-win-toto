import { readStores } from "@/common/utils/readWriteStores"
import { TotoCardProps } from "@/modules/toto/components/TotoCard";

const fileName = 'sg_lottery.json';

export const GET = async () => {
    const output = readStores<TotoCardProps>(`/${fileName}`, 'temp');

    return Response.json({
        message: 'Successfully retrieved lottery data',
        data: output
    })
}