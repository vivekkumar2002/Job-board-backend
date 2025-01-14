import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Job } from '../models/Job';
import { IJob } from '../interfaces/job.interface';

export class JobRepository {
    private repository: Repository<Job>;

    constructor() {
        this.repository = AppDataSource.getRepository(Job);
    }

    async create(jobData: IJob): Promise<Job> {
        const job = this.repository.create(jobData);
        return await this.repository.save(job);
    }

    async findAll(): Promise<Job[]> {
        return await this.repository.find({
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async findById(id: number): Promise<Job | null> {
        return await this.repository.findOneBy({ id });
    }

    async update(id: number, jobData: IJob): Promise<Job | null> {
        await this.repository.update(id, jobData);
        return await this.repository.findOneBy({ id });
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
} 