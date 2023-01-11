/* Heroku entrypoint */
import express, { Express, Request, Response } from 'express';
import { lights } from '../db';

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', async (req: Request, res: Response) => {
    const lightsData = await lights();
    console.log(lightsData);
    res.send(lightsData);
});

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
