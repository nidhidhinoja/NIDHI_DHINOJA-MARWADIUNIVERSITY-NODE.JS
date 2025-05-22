"use strict";
// === File: backend/src/controllers/auth.controller.ts ===
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const database_1 = require("../config/database");
const User_1 = require("../entity/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const userRepo = database_1.AppDataSource.getRepository(User_1.User);
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const existing = yield userRepo.findOne({ where: { username } });
    if (existing)
        return res.status(400).json({ error: 'User already exists' });
    const hashed = yield bcrypt_1.default.hash(password, 10);
    const user = userRepo.create({ username, password: hashed, role: 'Employee' });
    yield userRepo.save(user);
    res.status(201).json({ message: 'Signup successful' });
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield userRepo.findOne({ where: { username } });
    if (!user)
        return res.status(400).json({ error: 'Invalid credentials' });
    const valid = yield bcrypt_1.default.compare(password, user.password);
    if (!valid)
        return res.status(400).json({ error: 'Invalid credentials' });
    const token = (0, jwt_1.generateToken)({ id: user.id, role: user.role });
    res.json({ token, role: user.role });
});
exports.login = login;
