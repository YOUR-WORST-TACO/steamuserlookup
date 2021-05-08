import * as express from 'express';
import * as SteamAPI from 'steamapi';
import * as bodyParser from 'body-parser';

import * as dotenv from 'dotenv';
import * as path from "path";
dotenv.config();

import {Server} from '@fabricio-191/valve-server-query';

(async () => {
    // @ts-ignore
    const server = await Server({
        ip: '208.78.165.165',
        port: 27070,
    });

    console.log( await server.getInfo());
})()

const app = express();
const port = process.env.PORT || 3000;
const steamToken = process.env.STEAM_KEY || "";
const steam = new SteamAPI(steamToken);

const error = {
    INVALID_STEAM_URL: 1,
    STEAM_ID_NOT_FOUND: 2,
}

const urls = [
    'https://steamcommunity.com/id/yourworsttaco/',
    'https://steamcommunity.com/id/andarlif/',
    'https://steamcommunity.com/profiles/76561198065505589/',
    'https://steamcommunity.com/id/kekkyx/',
    'https://steamcommunity.com/profiles/76561198108795706/',
    'https://steamcommunity.com/id/GinIsWoke/'
];

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
}

app.get('/', async (req, res) => {
    if (process.env.NODE_ENV === 'development') {
        return res.redirect('http://localhost:8080');
    }

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/resolve', async (req, res) => {
    if (!req.body.steam_urls) {
        return res.sendStatus(400);
    }

    if (!Array.isArray(req.body.steam_urls)) {
        return res.sendStatus(400);
    }

    const errors = [];
    const success = [];

    for (const steam_url of req.body.steam_urls) {
        if (!steam_url.includes('https://steamcommunity.com/id/') && !steam_url.includes('https://steamcommunity.com/profiles/')) {
            errors.push({
                url: steam_url,
                error: "Invalid steam url.",
                code: error.INVALID_STEAM_URL
            });
        } else {
            try {
                const steam_id = await steam.resolve(steam_url);

                const user_info = await steam.getUserSummary(steam_id);

                success.push({
                    ...user_info,
                });
            } catch (e) {
                if (e instanceof TypeError) {
                    errors.push({
                        url: steam_url,
                        error: "No steam id found for url.",
                        code: error.STEAM_ID_NOT_FOUND
                    });
                }
            }
        }
    }

    res.json({
        data: success,
        errors: errors
    });
    //res.sendStatus(200);
});

app.post('/server', async (req,res) => {
    if (!req.body.steam_id) {
        return res.sendStatus(400);
    }

    try {
        const user_info = await steam.getUserSummary(req.body.steam_id);

        console.log(user_info);
    } catch (e) {

    }
});

app.listen(port, () => {
    console.log(`Steam Player Lookup running on port ${port}`);
})
