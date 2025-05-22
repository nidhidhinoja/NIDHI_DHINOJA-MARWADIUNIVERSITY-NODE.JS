"use strict";
// === File: backend/src/routes/request.routes.ts ===
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_controller_1 = require("../controllers/request.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Employee']), request_controller_1.submitRequest);
router.patch('/:id', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Manager']), request_controller_1.updateRequestStatus);
router.get('/', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Manager']), request_controller_1.getAllRequests);
exports.default = router;
