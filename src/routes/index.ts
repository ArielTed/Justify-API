import { Router } from 'express';

import { justifyRouter } from './justify';
import { tokenRouter } from './token';

const router = Router();
router.use('/', justifyRouter);
router.use('/', tokenRouter);

export { router };
