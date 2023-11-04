import AppContainer from '@/components/app-container';
import AppPagination from '@/components/app-pagination';
import SeriesBlock from '@/components/series-block';
import AppLayout from '@/layouts/app-layout';
import axios from '@/services/api/axios';
import { useEffect, useState } from 'react';

export default function Index() {
    const [url, setUrl] = useState('/api/playlists');
    const [playlists, setPlaylists] = useState([]);
    const [meta, setMeta] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const getPlaylists = async () => {
            let { data } = await axios.get(url);
            setPlaylists(data.data);
            setLinks(data.links);
            setMeta(data.meta);
        };
        getPlaylists();
    }, [url]);

    return (
        <AppLayout title='Series'>
            <div className='border-b py-44'>
                <AppContainer>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h2 className='text-2xl font-bold tracking-tight text-primary'>Series</h2>
                            <p className='text-lg leading-8 text-muted-foreground'>
                                The latest series from our screencast.
                            </p>
                        </div>
                    </div>
                </AppContainer>
            </div>
            <AppContainer>
                <div className='py-24'>
                    <SeriesBlock series={playlists} />
                    {meta.has_pages && (
                        <div className='mt-24'>
                            <AppPagination meta={meta} links={links} setUrl={setUrl} />
                        </div>
                    )}
                </div>
            </AppContainer>
        </AppLayout>
    );
}
