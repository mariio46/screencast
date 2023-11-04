import axios from '@/services/api/axios';
import { useEffect, useState } from 'react';

const useCheck = (identifier) => {
    const [hasPurchased, setHasPurchased] = useState(false);
    const [hasInCart, setHasInCart] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const checkHasPurchased = async () => {
            let { data } = await axios.get(`/api/check-user-puchased-playlist-${identifier}`);
            if (isMounted) setHasPurchased(data.data);
        };

        const checkHasInCart = async () => {
            let { data } = await axios.get(`/api/check-user-add-playlist-to-cart-${identifier}`);
            if (isMounted) setHasInCart(data.data);
        };

        checkHasInCart();
        checkHasPurchased();
    }, [identifier]);
    return { hasPurchased, hasInCart };
};

export default useCheck;
