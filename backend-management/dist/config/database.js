"use strict";
// === File: backend/src/config/database.ts ===
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const Software_1 = require("../entity/Software");
const Request_1 = require("../entity/Request");
require("dotenv/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Software_1.Software, Request_1.Request],
});
