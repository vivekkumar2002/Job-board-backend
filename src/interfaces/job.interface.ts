export interface IJob {
  id?: number;
  title: string;
  company: string;
  location: string;
  salary: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
