import {permission} from "../../middleware/permit";
import * as express from "express";
import {comment, deleteComment, voteForComment} from "./controller";

const router = express.Router();

router.post('/', permission(['member', 'admin']), comment)
router.put('/', permission(['member', 'admin']), voteForComment)
router.delete('/:postId/:commentId', permission(['member', 'admin']), deleteComment)

export default router;
