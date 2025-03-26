import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import { AppDataSource } from './database/dataSource';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => console.log('Database connected'))
  .catch(error => console.log(error));

app.use(express.json());
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ==========================
// src/database/dataSource.ts - Configuração do Banco de Dados
// ==========================
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Task } from '../entities/Task';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database.sqlite',
  entities: [Task],
  synchronize: true,
});

// ==========================
// src/entities/Task.ts - Definição da Entidade Task
// ==========================
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'pendente' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}

// ==========================
// src/routes/taskRoutes.ts - Definição das Rotas
// ==========================
import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
const router = Router();

const taskController = new TaskController();

router.post('/', taskController.create);
router.get('/', taskController.getAll);
router.get('/:id', taskController.getOne);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

export default router;

// ==========================
// src/controllers/TaskController.ts - Lógica das APIs com Banco de Dados
// ==========================
import { Request, Response } from 'express';
import { AppDataSource } from '../database/dataSource';
import { Task } from '../entities/Task';
import { Repository } from 'typeorm';

export class TaskController {
  private taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = AppDataSource.getRepository(Task);
  }

  async create(req: Request, res: Response) {
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const task = this.taskRepository.create({ title, description, status: status || 'pendente' });
    await this.taskRepository.save(task);
    return res.status(201).json(task);
  }

  async getAll(req: Request, res: Response) {
    const tasks = await this.taskRepository.find();
    return res.json(tasks);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const task = await this.taskRepository.findOne({ where: { id: Number(id) } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.json(task);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await this.taskRepository.findOne({ where: { id: Number(id) } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await this.taskRepository.save(task);
    return res.json(task);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const task = await this.taskRepository.findOne({ where: { id: Number(id) } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await this.taskRepository.remove(task);
    return res.status(204).send();
  }
}
