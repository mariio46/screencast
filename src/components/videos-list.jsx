import { Link } from 'react-router-dom';

const VideoList = ({ playlist, videos }) => {
    return (
        <>
            {videos.length ? (
                <ul className='flex flex-col gap-y-2 text-[0.900rem]/[1.35rem] text-foreground'>
                    {videos.map((video, i) => (
                        <li key={i}>
                            <Link
                                to={`/series/${playlist}/${video.episode}`}
                                className='flex items-center justify-between'>
                                <span>{video.title}</span>
                                <span>{video.runtime}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : null}
        </>
    );
};

export default VideoList;
