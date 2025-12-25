import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
import { AdminRoutes } from '../modules/Admin/admin.routes';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { categoryRoutes } from '../modules/category/category.routes';
import path from 'path';
import { blogRoutes } from '../modules/blog/blog.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/category',
        route: categoryRoutes
    },
    {
        path: '/blog',
        route: blogRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;