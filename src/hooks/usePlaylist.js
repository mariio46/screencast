import axios from '@/services/api/axios';
import { useEffect, useState } from 'react';

const usePlaylist = (identifier) => {
    const [playlist, setPlaylist] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const getPlaylist = async () => {
            try {
                let { data } = await axios.get(`/api/playlists/${identifier}/videos`);
                if (isMounted) {
                    setPlaylist(data.playlist);
                    setVideos(data.data);
                }
            } catch (response) {
                console.log(response.data);
            }
        };

        getPlaylist();
    }, [identifier]);

    return { playlist, videos };
};

export default usePlaylist;
