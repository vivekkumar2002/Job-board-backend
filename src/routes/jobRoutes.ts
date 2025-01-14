import { Router } from 'express';
import { JobController } from '../controllers/jobController';

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - title
 *         - company
 *         - location
 *         - salary
 *         - description
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the job
 *         title:
 *           type: string
 *           description: The job title
 *         company:
 *           type: string
 *           description: The company name
 *         location:
 *           type: string
 *           description: Job location
 *         salary:
 *           type: number
 *           description: Job salary
 *         description:
 *           type: string
 *           description: Job description
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const router = Router();
const jobController = new JobController();

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job posting
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: The job was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       500:
 *         description: Server error
 */
router.post('/', jobController.createJob);

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Returns the list of all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: The list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 */
router.get('/', jobController.getAllJobs);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a job by id
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The job id
 *     responses:
 *       200:
 *         description: The job description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: The job was not found
 */
router.get('/:id', jobController.getJobById);

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Update a job by id
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The job id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: The job was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: The job was not found
 */
router.put('/:id', jobController.updateJob);

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Remove a job by id
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The job id
 *     responses:
 *       204:
 *         description: The job was deleted
 *       404:
 *         description: The job was not found
 */
router.delete('/:id', jobController.deleteJob);

export default router; 