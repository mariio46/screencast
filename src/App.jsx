import Loading from '@/components/loading';
import router from '@/router';
import axios from '@/services/api/axios';
import { authenticatedUser, userCartCount } from '@/services/store';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export default function App() {
    const [loading, setLoading] = useState(true);
    const setAuth = useSetRecoilState(authenticatedUser);
    const setUserCartCount = useSetRecoilState(userCartCount);

    useEffect(() => {
        let isMounted = true;
        const getApiData = async () => {
            setLoading(true);
            try {
                let user = await axios.get('/api/me');
                let carts = await axios.get('/api/carts');
                if (isMounted) {
                    setAuth({ user: user.data.data, check: true });
                    setUserCartCount(carts.data);
                    setLoading(false);
                }
            } catch ({ response }) {
                setLoading(false);
            }
        };

        getApiData();
    }, [setAuth, setUserCartCount]);
    if (loading) {
        return <Loading />;
    }
    return <RouterProvider router={router} />;
}
