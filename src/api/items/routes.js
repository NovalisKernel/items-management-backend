import { Router } from 'express';
import {
  addItemController,
  getItemsController,
  deleteItemController,
  getItemByIdController,
  updateItemController
} from './controller';
import { upload } from '../../middleware/upload.middleware';

const router = Router();

router.post('/', upload, addItemController);
router.put('/:id', upload, updateItemController);
router.get('/', getItemsController);
router.get('/:id', getItemByIdController);
router.delete('/:id', deleteItemController);

export default router;
