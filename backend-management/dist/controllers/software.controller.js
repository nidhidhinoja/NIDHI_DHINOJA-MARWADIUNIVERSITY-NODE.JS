"use strict";
// === File: backend/src/controllers/software.controller.ts ===
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSoftware = void 0;
const database_1 = require("../config/database");
const Software_1 = require("../entity/Software");
const softwareRepo = database_1.AppDataSource.getRepository(Software_1.Software);
const createSoftware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, accessLevels } = req.body;
    const software = softwareRepo.create({ name, description, accessLevels });
    yield softwareRepo.save(software);
    res.status(201).json({ message: 'Software created' });
});
exports.createSoftware = createSoftware;
