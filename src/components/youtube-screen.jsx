import YouTube from 'react-youtube';

export default function YoutubeScreen({ uniqueCode }) {
    return <YouTube videoId={uniqueCode} iframeClassName={'w-full h-full rounded aspect-video'} />;
}
