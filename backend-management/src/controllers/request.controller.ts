import { Request as Req, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Request as AccessRequest } from '../entity/Request';
import { Software } from '../entity/Software';
import { User } from '../entity/User';

const requestRepo = AppDataSource.getRepository(AccessRequest);
const softwareRepo = AppDataSource.getRepository(Software);
const userRepo = AppDataSource.getRepository(User);

export const submitRequest = async (req: Req, res: Response) => {
    try {
        const { softwareId, accessType, reason } = req.body;
        
        // Validation
        if (!softwareId || !accessType || !reason) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const software = await softwareRepo.findOneBy({ id: softwareId });
        if (!software) {
            return res.status(404).json({ error: 'Software not found' });
        }

        const user = await userRepo.findOneBy({ id: (req as any).user.id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if user already has a pending request for this software
        const existingRequest = await requestRepo.findOne({
            where: {
                user: { id: user.id },
                software: { id: software.id },
                status: 'Pending'
            }
        });

        if (existingRequest) {
            return res.status(400).json({ 
                error: 'You already have a pending request for this software' 
            });
        }

        // Validate access type against software's allowed levels
        if (!software.accessLevels.includes(accessType)) {
            return res.status(400).json({ 
                error: 'Invalid access type for this software' 
            });
        }

        const newRequest = requestRepo.create({
            user,
            software,
            accessType,
            reason,
            status: 'Pending'
        });

        await requestRepo.save(newRequest);
        res.status(201).json({ 
            message: 'Request submitted successfully',
            id: newRequest.id 
        });

    } catch (error) {
        console.error('Request submission error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateRequestStatus = async (req: Req, res: Response) => {
    try {
        const { id } = req.params;
        const { status, comment } = req.body;

        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const request = await requestRepo.findOne({
            where: { id: Number(id) },
            relations: ['user', 'software']
        });

        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        if (request.status !== 'Pending') {
            return res.status(400).json({ 
                error: 'Can only update pending requests' 
            });
        }

        request.status = status;
        request.managerComment = comment;
        request.updatedAt = new Date();

        await requestRepo.save(request);

        res.json({ 
            message: `Request ${status.toLowerCase()} successfully`,
            request 
        });

    } catch (error) {
        console.error('Status update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllRequests = async (req: Req, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const status = req.query.status as string;

        const queryBuilder = requestRepo.createQueryBuilder('request')
            .leftJoinAndSelect('request.user', 'user')
            .leftJoinAndSelect('request.software', 'software')
            .orderBy('request.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);

        if (status) {
            queryBuilder.where('request.status = :status', { status });
        }

        const [requests, total] = await queryBuilder.getManyAndCount();

        res.json({
            requests,
            pagination: {
                current: page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Fetch requests error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};