"use strict";
// === File: backend/src/controllers/request.controller.ts ===
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
exports.getAllRequests = exports.updateRequestStatus = exports.submitRequest = void 0;
const database_1 = require("../config/database");
const Request_1 = require("../entity/Request");
const Software_1 = require("../entity/Software");
const User_1 = require("../entity/User");
const requestRepo = database_1.AppDataSource.getRepository(Request_1.Request);
const submitRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { softwareId, accessType, reason } = req.body;
    const software = yield database_1.AppDataSource.getRepository(Software_1.Software).findOneBy({ id: softwareId });
    const user = yield database_1.AppDataSource.getRepository(User_1.User).findOneBy({ id: req.user.id });
    const newReq = requestRepo.create({ user, software, accessType, reason, status: 'Pending' });
    yield requestRepo.save(newReq);
    res.status(201).json({ message: 'Request submitted' });
});
exports.submitRequest = submitRequest;
const updateRequestStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield requestRepo.findOneBy({ id: Number(req.params.id) });
    if (!request)
        return res.status(404).json({ error: 'Request not found' });
    request.status = req.body.status;
    yield requestRepo.save(request);
    res.json({ message: 'Status updated' });
});
exports.updateRequestStatus = updateRequestStatus;
const getAllRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield requestRepo.find({ relations: ['user', 'software'] });
    res.json(requests);
});
exports.getAllRequests = getAllRequests;
