import { Router } from "express";
import * as controller from '../controllers/auth'
import passport from "passport";

const router:Router = Router()


router.route('/register').post(controller.register)
router.route('/login').post(passport.authenticate('local',{session:false}),controller.login)


export default router