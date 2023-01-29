/* Heroku entrypoint */
import express, { Express, Request, Response } from 'express';
import * as Lights from './Lights';

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', async (req: Request, res: Response) => {
    const data = await Lights.today();
    res.send(data);
});

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
