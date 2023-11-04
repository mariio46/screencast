import { Link } from 'react-router-dom';
import Image from './image';

export default function SeriesBlock({ series }) {
    return (
        <div className='grid grid-cols-1 gap-x-16 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            {series.map((item, i) => (
                <article key={i} className='flex flex-col items-start justify-between'>
                    <div className='relative w-full'>
                        <Link to={`/series/${item.slug}`}>
                            <Image
                                src={item.thumbnail}
                                alt={item.name}
                                className='aspect-[16/9] w-full rounded-2xl object-cover'
                            />
                            <div className='absolute inset-0 rounded-2xl ring-1 ring-muted-foreground/30' />
                        </Link>
                    </div>
                    <div className='max-w-xl'>
                        <div className='group relative'>
                            <h3 className='mt-5 line-clamp-1 text-lg font-semibold leading-6 text-primary'>
                                <Link to={`/series/${item.slug}`}>
                                    <span className='absolute inset-0' />
                                    {item.name}
                                </Link>
                            </h3>
                            <p className='mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground'>
                                {item.description}
                            </p>
                        </div>
                        <div className='mt-4 flex items-center justify-between text-[0.65rem]'>
                            <div className='flex items-center gap-x-2'>
                                {item.tags.map((tag, i) => (
                                    <Link
                                        key={i}
                                        to={tag.slug}
                                        className='relative z-10 rounded-full border px-3 py-0.5 font-semibold text-foreground hover:bg-muted-foreground/10'>
                                        {tag.name}
                                    </Link>
                                ))}
                            </div>
                            <div className='flex items-center gap-x-1'>
                                <p>{item.videos_count} Videos</p>
                                <p>|</p>
                                <p>{item.price.formatted}</p>
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}
