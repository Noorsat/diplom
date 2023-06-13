import * as express from "express";

const router = express.Router();
import {get, create, relikeAPost, getByIdAndView, getLikedPostsByUser, approval} from './controller'
import {permission} from "../../middleware/permit";
import {auth} from "../../middleware/jwt";

router.get('/', get)
router.post('/', [auth, permission(['admin', 'member'])], create)
router.put('/approval', [auth, permission(['admin'])], approval)
router.post('/like', [auth, permission(['admin', 'member'])], relikeAPost)
router.get('/view/:postId/:userId', getByIdAndView)
router.get('/like/:userId', [auth, permission(['member', 'admin'])], getLikedPostsByUser)

export default router;
