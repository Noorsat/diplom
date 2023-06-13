import *as  express from "express";
import {permission} from "../../middleware/permit";
import {create, get, getByCategory} from './controller'

const router = express.Router();

router.post('/', permission(['admin']), create)
router.get('/', get)
router.get('/:category', getByCategory)

export default router;
