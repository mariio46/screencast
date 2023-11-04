import AppContainer from '@/components/app-container';
import { Icon } from '@/components/icon';
import Image from '@/components/image';
import { Button, buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import VideoList from '@/components/videos-list';
import useCheck from '@/hooks/useCheck';
import usePlaylist from '@/hooks/usePlaylist';
import AppLayout from '@/layouts/app-layout';
import axios from '@/services/api/axios';
import { userCartCount } from '@/services/store';
import { Link, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export default function Show() {
    const setUserCartCount = useSetRecoilState(userCartCount);
    const { slug } = useParams();
    const { playlist, videos } = usePlaylist(slug);
    const { hasPurchased, hasInCart } = useCheck(slug);

    const AddToCartHandler = async () => {
        try {
            let { data } = await axios.post(`/api/add-to-cart/${playlist.slug}`);
            toast({
                title: 'Success',
                description: `${data.message}`,
            });
            setUserCartCount((cart) => [...cart, data.data]);
        } catch ({ response }) {
            toast({
                title: 'Failed',
                description: `${response.data.message}`,
                variant: 'destructive',
            });
        }
    };

    return (
        <>
            <AppLayout title={playlist.name}>
                <AppContainer className={'py-14'}>
                    {playlist ? (
                        <div className='flex items-start justify-between gap-x-5'>
                            <div className='w-1/2'>
                                <div className='rounded-xl border p-10'>
                                    <div className='relative w-full'>
                                        <Image
                                            src={playlist.thumbnail}
                                            alt={playlist.name}
                                            className='rounded'
                                        />
                                        <div className='absolute inset-0 rounded ring-1 ring-muted-foreground/30' />
                                    </div>
                                    <div className='mt-3'>
                                        <h2 className='my-3 text-2xl font-bold'>{playlist.name}</h2>
                                        <p className='text-sm text-muted-foreground'>
                                            {playlist.episode}, Last update on {playlist.updated}
                                        </p>
                                    </div>
                                    <div className='mt-6 flex items-center gap-x-3'>
                                        <Link
                                            to={`/series/${playlist.slug}/1`}
                                            className={buttonVariants({
                                                variant: 'secondary',
                                                className:
                                                    'items-center gap-x-1 !rounded-full border font-semibold',
                                            })}>
                                            <Icon name={'IconPlayerPlayFilled'} />
                                            Watch
                                        </Link>
                                        {!hasPurchased && !hasInCart && (
                                            <Button
                                                onClick={AddToCartHandler}
                                                variant='default'
                                                className='items-center gap-x-1 rounded-full font-semibold'>
                                                <Icon name={'IconShoppingCartPlus'} />
                                                Add to cart
                                            </Button>
                                        )}
                                    </div>
                                    <div className='my-8'>
                                        <p className='text-[0.900rem]/[1.35rem] text-muted-foreground'>
                                            {playlist.description}
                                        </p>
                                    </div>
                                    <div>
                                        <div className='mt-4 flex items-center justify-between text-[0.65rem]'>
                                            <div className='flex items-center gap-x-2'>
                                                {playlist.tags?.map((tag, i) => (
                                                    <Link
                                                        key={i}
                                                        className='relative z-10 rounded-full border px-3 py-0.5 font-semibold text-foreground hover:bg-muted-foreground/10'>
                                                        {tag.name}
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className='flex items-center gap-x-1'>
                                                <p>{playlist.episode}</p>
                                                <p>|</p>
                                                <p>{playlist.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <div className='p-5'>
                                    <div>
                                        <h3 className='text-xl font-bold tracking-tight text-foreground'>
                                            {playlist.name}
                                        </h3>
                                        <p className='text-sm font-medium text-muted-foreground'>
                                            There is {playlist.episode} ready to learn.
                                        </p>
                                    </div>
                                    <div className='mt-5'>
                                        <VideoList playlist={playlist.slug} videos={videos} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </AppContainer>
            </AppLayout>
        </>
    );
}
