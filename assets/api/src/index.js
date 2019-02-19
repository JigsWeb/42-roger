import regeneratorRuntime from "regenerator-runtime"
import express from 'express'
import http from 'http'
import socketIO from 'socket.io'
import jwt from 'jsonwebtoken'
import initMongoose from './mongoose'
import initMiddlewares, { AuthMiddleware } from './middlewares'
import initIO from './io';
import createQueryInterval from './utils/createQueryInterval';
import { Queries, Users, Pages } from './models'
import * as parsers from './utils/parsers';

const app = express()
const server = http.Server(app);
const io = socketIO(server);

initMongoose();
initMiddlewares(app);
initIO(io);

let intervals = {};

Queries.find().then(queries => {
    intervals = queries.reduce((res, q) => {
        res[q.id] = createQueryInterval(q, io);
        return res;
    }, {})
});

app.post('/authentification', async (req, res) => {
    const user = await Users.findOne({ username: req.body.username }); 
    if (user && user.validPassword(req.body.password))
        return res.json({ token: jwt.sign({ _id: user._id }, 'privateKeyDuFutur') });
    return res.sendStatus(400);
})

app
    .get('/pages', async (req, res) => {
        const docs = await Pages.find();
        res.json(docs);
    })
    .post('/pages', async (req, res) => {
        const { err, _doc } = await Pages.create(req.body);
        err ? res.sendStatus(400) : res.json(_doc);
    })
    .delete('/pages/:_id', async (req, res) => {
        const { err } = await Pages.remove(req.params);
        res.sendStatus(err ? 400 : 200);
    })

app
    .get('/queries', async (req, res) => res.json(await Queries.find()))
    .post('/queries', async (req, res) => {
        const { err, _doc } = await Queries.create(req.body);
        if (!err)
            intervals[_doc._id] = createQueryInterval(_doc, io);
        err ? res.sendStatus(400) : res.json(_doc);
    })
    .put('/queries/:_id', async (req, res) => {
        const { err } = await Queries.findOneAndUpdate(req.params, req.body);
        res.sendStatus(err ? 400 : 200);
    })
    .delete('/queries/:_id', async (req, res) => {
        if (intervals[req.params._id]) {
            clearInterval(intervals[req.params._id]);
            delete intervals[req.params._id];
        }
        const { err } = await Queries.deleteOne(req.params);
        res.sendStatus(err ? 400 : 200);
    })


server.listen(8000, () => {
    console.log('Example app listening on port 8000!')
})