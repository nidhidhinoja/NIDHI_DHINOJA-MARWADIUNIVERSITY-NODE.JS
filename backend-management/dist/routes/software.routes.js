"use strict";
// === File: backend/src/routes/software.routes.ts ===
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const software_controller_1 = require("../controllers/software.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['Admin']), software_controller_1.createSoftware);
exports.default = router;
