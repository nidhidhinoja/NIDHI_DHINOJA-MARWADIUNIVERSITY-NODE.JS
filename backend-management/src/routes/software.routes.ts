// === File: backend/src/routes/software.routes.ts ===

import { Router } from 'express';
import { createSoftware } from '../controllers/software.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

router.post('/', authMiddleware, roleMiddleware(['Admin']), createSoftware);

export default router;