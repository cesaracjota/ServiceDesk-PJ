export const routesConfig = [
    {
        path: '/auth/login',
        component: React.lazy(() => import('../components/auth/Login')),
    }
];