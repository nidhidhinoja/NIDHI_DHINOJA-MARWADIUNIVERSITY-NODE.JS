"use strict";
// === File: backend/src/index.ts ===
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const software_routes_1 = __importDefault(require("./routes/software.routes"));
const request_routes_1 = __importDefault(require("./routes/request.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use('/api/software', software_routes_1.default);
app.use('/api/requests', request_routes_1.default);
database_1.AppDataSource.initialize().then(() => {
    app.listen(5000, () => console.log('Server started on port 5000'));
});
