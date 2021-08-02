import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { poolPG } from '../database/connection';
import { TOKEN_SECRET } from '../env';
import { isValidEmail } from '../helpers/validation';

const tokenRouter = Router();

tokenRouter.post('/token', async (req, res) => {
  if (!isValidEmail(req.body.email)) return res.status(400).json({ error: 'invalid email address' });

  const token = jwt.sign(req.body.email, TOKEN_SECRET as string);

  try {
    await poolPG.query('INSERT INTO users(email) VALUES ($1) ON CONFLICT DO NOTHING', [req.body.email]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'internal error' });
  }

  return res.status(200).json(token);
});

export { tokenRouter };
