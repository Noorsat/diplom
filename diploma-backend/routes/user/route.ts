import * as express from 'express';
import {get} from "./controller";
import {permission} from "../../middleware/permit";
const router = express.Router();

router.get('/:userId', [permission(['admin'])], get)
export default router;
