const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const dbConfig = require("../database/dbConfig")
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
    session({
        name: "token",
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET || "SECRET",
        cookie: {
            httpOnly: true
        },
        store: new KnexSessionStore({
            knex: dbConfig,
            createTable: true
        })
    })
)

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
