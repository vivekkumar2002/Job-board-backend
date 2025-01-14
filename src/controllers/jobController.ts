import { Request, Response } from 'express';
import { JobRepository } from '../repositories/jobRepository';

export class JobController {
  private jobRepository: JobRepository;

  constructor() {
    this.jobRepository = new JobRepository();
  }

  private handleError(res: Response, error: any, message: string) {
    console.error(error);
    res.status(500).json({ error: message });
  }

  createJob = async (req: Request, res: Response): Promise<void> => {
    try {
      const job = await this.jobRepository.create(req.body);
      res.status(201).json(job);
    } catch (error) {
      this.handleError(res, error, 'Error creating job posting');
    }
  };

  getAllJobs = async (req: Request, res: Response): Promise<void> => {
    try {
      const jobs = await this.jobRepository.findAll();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching jobs' });
    }
  };

  getJobById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const job = await this.jobRepository.findById(id);
      if (!job) {
        res.status(404).json({ error: 'Job not found' });
        return;
      }
      res.status(200).json(job);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching job' });
    }
  };

  updateJob = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const job = await this.jobRepository.update(id, req.body);
      if (!job) {
        res.status(404).json({ error: 'Job not found' });
        return;
      }
      res.status(200).json(job);
    } catch (error) {
      res.status(500).json({ error: 'Error updating job' });
    }
  };

  deleteJob = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const success = await this.jobRepository.delete(id);
      if (!success) {
        res.status(404).json({ error: 'Job not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting job' });
    }
  };
} 