import NotFound from '@/404';
import Authenticated from '@/middleware/authenticated';
import Guest from '@/middleware/guest';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import Dashboard from '@/pages/dashboard';
import Home from '@/pages/home';
import Cart from '@/pages/order/cart';
import PaymentSuccess from '@/pages/order/payment-success';
import Index from '@/pages/playlists';
import Show from '@/pages/playlists/show';
// import Show as VideoShow from '@/pages/video/show';
// import VideoShow from '@/pages/videos/show';
import * as Videos from '@/pages/videos/index';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '*',
        element: <NotFound />,
    },
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/dashboard',
        element: <Authenticated render={<Dashboard />} />,
    },
    {
        path: '/login',
        element: <Guest render={<Login />} />,
    },
    {
        path: '/register',
        element: <Guest render={<Register />} />,
    },
    {
        path: '/series',
        element: <Index />,
    },
    {
        path: '/series/:slug',
        element: <Show />,
    },
    {
        path: '/series/:slug/:episode',
        element: <Videos.Show />,
        // element: <VideoShow />,
    },
    {
        path: '/carts',
        element: <Authenticated render={<Cart />} />,
    },
    {
        path: '/payment-success',
        element: <Authenticated render={<PaymentSuccess />} />,
    },
]);

export default router;
