import { Router } from 'express';
import { Category } from '../model/category';

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post('/', (request, response) => {
  const { name, descriptions } = request.body;

  const category: Category = new Category();

  Object.assign(category, {
    name,
    descriptions,
    created_at: new Date(),
  });

  categories.push(category);

  return response.status(201).json({ category });
});

export { categoriesRoutes };
