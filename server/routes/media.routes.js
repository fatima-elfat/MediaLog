import express from 'express';
import {
  getMediaLogs,
  getMediaLog,
  createMediaLog,
  updateMediaLog,
  deleteMediaLog,
} from '../controllers/media.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', getMediaLogs);
router.get('/:id', getMediaLog);
router.post('/', createMediaLog);
router.put('/:id', updateMediaLog);
router.delete('/:id', deleteMediaLog);

export default router;
