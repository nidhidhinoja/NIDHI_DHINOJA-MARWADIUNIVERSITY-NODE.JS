// === File: backend/src/controllers/auth.controller.ts ===

import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';

const userRepo = AppDataSource.getRepository(User);

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const existing = await userRepo.findOne({ where: { username } });
  if (existing) return res.status(400).json({ error: 'User already exists' });
  const hashed = await bcrypt.hash(password, 10);
  const user = userRepo.create({ username, password: hashed, role: 'Employee' });
  await userRepo.save(user);
  res.status(201).json({ message: 'Signup successful' });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await userRepo.findOne({ where: { username } });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  const token = generateToken({ id: user.id, role: user.role });
  res.json({ token, role: user.role });
};