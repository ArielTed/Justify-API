import { Router } from 'express';

import { poolPG } from '../database/connection';
import { authenticateToken } from '../middlewares/auth';

const justifyRouter = Router();

const justify = (str: string, len: number): string => {
  const regex = RegExp('(?:\\s|^)(.{1,' + len + '})(?=\\s|$)', 'g');
  const parsedString = [];
  const justifiedString = [];

  let parsed = regex.exec(str);
  while (parsed !== null) {
    parsedString.push(parsed[1].trim());
    parsed = regex.exec(str);
  }

  for (let i = 0; i < parsedString.length - 1; i++) {
    if (parsedString[i].indexOf(' ') !== -1) {
      while (parsedString[i].length < len) {
        for (let j = 0; j < parsedString[i].length - 1; j++) {
          if (parsedString[i][j] === ' ') {
            parsedString[i] = parsedString[i].substring(0, j) + ' ' + parsedString[i].substring(j);
            if (parsedString[i].length === len) break;
            while (parsedString[i][j] === ' ') j++;
          }
        }
      }
    }
    if (parsedString[i].search(/\S/g) !== -1) justifiedString.push(parsedString[i]);
  }

  if (parsedString[parsedString.length - 1].search(/\S/g) !== -1) justifiedString.push(parsedString[parsedString.length - 1]);

  return justifiedString.join('\n');
};

justifyRouter.post('/justify', authenticateToken, async (req, res) => {
  const text: string = req.body;
  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'body must be of type text/plain' });
  }

  const words = text.trim().split(/\s+/).length;
  if (words > 80000) return res.status(402).json({ error: 'daily limit rate of 80000 words reached' });

  try {
    // @ts-ignore
    const getUser = await poolPG.query('SELECT last_used, limit_rate FROM users WHERE email = $1', [req.user]);

    if (!getUser.rows[0]) return res.status(403).json({ error: "user doesn't exist" });

    let updatedLimitRate: number;
    if (new Date().getTime() - getUser.rows[0].last_used.getTime() >= 86400000) updatedLimitRate = words;
    else updatedLimitRate = words + getUser.rows[0].limit_rate;

    if (updatedLimitRate > 80000) return res.status(402).json({ error: 'daily limit rate of 80000 words reached' });
    else {
      const updateUser = await poolPG.query(
        'UPDATE users SET limit_rate = $1, last_used = CURRENT_DATE WHERE email = $2',
        // @ts-ignore
        [updatedLimitRate, req.user]
      );

      console.log(updateUser);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'internal error' });
  }

  const justifiedText = justify(text, 80);
  return res.setHeader('Content-Type', 'text/plain').status(200).send(justifiedText);
});

export { justifyRouter };
