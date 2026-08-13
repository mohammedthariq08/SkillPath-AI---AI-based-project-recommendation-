import { Router } from 'express';
import { Register } from '../Controllers/RegisterController.mjs';
import { Login } from '../Controllers/RegisterController.mjs';
import { Logout } from '../Controllers/RegisterController.mjs';

const regRouter = Router();

regRouter.post('/register',Register);
regRouter.post('/Login',Login);
regRouter.post('/logout',Logout);

export default regRouter;