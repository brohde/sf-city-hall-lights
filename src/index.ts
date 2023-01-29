/* Heroku entrypoint */
import express, { Express, Request, Response } from 'express';
import { get as getLights } from './lights';

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', async (req: Request, res: Response) => {

    // const res = Lights.today();
    
    //      NotionApi.

    //  const data = await LightsApi.fetch()
    //  const response = await LightsResponse.format(data)
    
    //  LightsResponse

    const data = await getLights();
    res.send(data);
});

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
