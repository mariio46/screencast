import axios from '@/services/api/axios';
import { useEffect, useState } from 'react';

const useVideo = (slug, episode) => {
    const [video, setVideo] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorStatus, setErrorStatus] = useState(false);

    useEffect(() => {
        const getVideo = async () => {
            let isMounted = true;
            try {
                let { data } = await axios.get(`/api/playlists/${slug}/${episode}`);
                if (isMounted) {
                    setVideo(data.data);
                    setErrorStatus(false);
                }
            } catch ({ response }) {
                setErrorStatus(true);
                setErrorMessage(response.data.message);
                console.log(response.data.message);
            }
        };

        getVideo();
    }, [slug, episode]);
    return { video, errorStatus, errorMessage };
};

export default useVideo;
