import { recommendedProjects,projectHistory,updateTask } from "../Controllers/RecommendationController.mjs";
import { authmiddleware } from "../middleware/authentication.mjs";
import { Router } from 'express';

const recRouter = Router();

recRouter.post('/generate',authmiddleware,recommendedProjects);
recRouter.get('/history',authmiddleware,projectHistory);
recRouter.post('/history/tasks/:recId/:projectIdx/:weekIdx/:taskIdx',authmiddleware, updateTask );

export default recRouter;