import { authenticatedUser } from '@/services/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export default function Authenticated({ render }) {
    const auth = useRecoilValue(authenticatedUser);
    const navigate = useNavigate();
    useEffect(() => {
        if (!auth.check) {
            navigate('/login');
        }
    }, []);
    return render;
}
