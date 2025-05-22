// === File: backend/src/routes/request.routes.ts ===

import { Router } from 'express';
import { submitRequest, updateRequestStatus, getAllRequests } from '../controllers/request.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

router.post('/', authMiddleware, roleMiddleware(['Employee']), submitRequest);
router.patch('/:id', authMiddleware, roleMiddleware(['Manager']), updateRequestStatus);
router.get('/', authMiddleware, roleMiddleware(['Manager']), getAllRequests);

export default router;