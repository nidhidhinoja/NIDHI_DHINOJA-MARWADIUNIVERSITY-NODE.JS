// === File: backend/src/controllers/software.controller.ts ===

import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Software } from '../entity/Software';

const softwareRepo = AppDataSource.getRepository(Software);

export const createSoftware = async (req: Request, res: Response) => {
  const { name, description, accessLevels } = req.body;
  const software = softwareRepo.create({ name, description, accessLevels });
  await softwareRepo.save(software);
  res.status(201).json({ message: 'Software created' });
};