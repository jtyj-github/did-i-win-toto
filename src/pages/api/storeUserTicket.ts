/**  this api stores the user ticket in the mongodb database */
import { NextApiRequest, NextApiResponse } from 'next';

const storeUserTicket = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        console.log(req.body)
        const { ticket } = req.body;
        console.log(ticket);
        res.status(200).json({ ticket });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default storeUserTicket;