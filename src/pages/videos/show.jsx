import ErrorScreen from '@/components/error-screen';
import VideoList from '@/components/videos-list';
import useCheck from '@/hooks/useCheck';
import usePlaylist from '@/hooks/usePlaylist';
import useVideo from '@/hooks/useVideo';
import AuthLayout from '@/layouts/auth-layout';
import { Link, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

export default function Show() {
    const { slug, episode } = useParams();
    const { playlist, videos } = usePlaylist(slug);
    const { video, errorStatus, errorMessage } = useVideo(slug, episode);
    const { hasPurchased } = useCheck(slug);

    return (
        <AuthLayout title={video.title ?? 'Undefine'}>
            <div className='grid w-full grid-cols-1 lg:grid-cols-12'>
                <div className='order-last col-auto min-h-screen border-r lg:order-1 lg:col-span-3'>
                    <div className='w-full px-4 py-6'>
                        <h2 className='text-xl font-bold text-foreground'>
                            <Link to={`/series/${playlist.slug}`}>{playlist.name}</Link>
                        </h2>
                        <p className='text-sm font-medium text-muted-foreground'>
                            The list video from playlist name
                        </p>
                    </div>
                    <div className='w-full px-4'>
                        <VideoList playlist={playlist.slug} videos={videos} />
                    </div>
                </div>
                <div className='col-auto p-4 lg:order-2 lg:col-span-9'>
                    {hasPurchased && !errorStatus && (
                        <div className='w-full'>
                            <YouTube
                                videoId={video.unique_video_id}
                                iframeClassName={'w-full h-full rounded aspect-video'}
                            />
                        </div>
                    )}

                    {!hasPurchased && video.intro && !errorStatus && (
                        <div className='w-full'>
                            <YouTube
                                videoId={video.unique_video_id}
                                iframeClassName={'w-full h-full rounded aspect-video'}
                            />
                        </div>
                    )}

                    {errorStatus && (
                        <ErrorScreen
                            error={errorMessage}
                            redirect={`/series/${playlist.slug}`}
                            redirectName={'Back to series'}
                        />
                    )}
                </div>
            </div>
        </AuthLayout>
    );
}
