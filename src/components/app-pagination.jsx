import { Link } from 'react-router-dom';
import { Icon } from './icon';

export default function AppPagination({ meta, links, setUrl }) {
    return (
        <div className='flex justify-center px-5 pt-8'>
            <div className='flex items-center gap-3'>
                {meta.current_page !== 1 && (
                    <Link
                        onClick={() => setUrl(links.first)}
                        className='grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-primary shadow-[8.05051px_24.1515px_89.4501px_-11.6285px_rgba(22,52,80,0.05)] backdrop-blur-xl transition duration-300 hover:bg-primary/80'>
                        <Icon
                            name={'IconChevronsLeft'}
                            className='h-6 w-6 stroke-primary-foreground stroke-[1.6]'
                        />
                    </Link>
                )}
                {links.prev ? (
                    <Link
                        // to={links.prev}
                        onClick={() => setUrl(links.prev)}
                        className='grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-primary shadow-[8.05051px_24.1515px_89.4501px_-11.6285px_rgba(22,52,80,0.05)] backdrop-blur-xl transition duration-300 hover:bg-primary/80'>
                        <Icon
                            name={'IconChevronLeft'}
                            className='h-6 w-6 stroke-primary-foreground stroke-[1.6]'
                        />
                    </Link>
                ) : (
                    <div className='grid h-10 w-10 place-items-center rounded-full bg-primary/20 shadow-[8.05051px_24.1515px_89.4501px_-11.6285px_rgba(22,52,80,0.05)] backdrop-blur-xl transition duration-300'>
                        <Icon
                            name={'IconChevronLeft'}
                            className='h-6 w-6 stroke-primary-foreground stroke-[1.6]'
                        />
                    </div>
                )}
                <div className='grid w-16 place-items-center'>
                    <div className='relative h-12 w-14'>
                        <div className='absolute right-[60%] top-0 text-xl font-semibold transition-all duration-300'>
                            {meta.current_page}
                        </div>
                        {Array.from(Array(meta.total).keys()).map((i) => (
                            <div
                                key={i}
                                className='absolute -top-5 right-[20%] text-xl font-semibold opacity-0 transition-all duration-300'
                                children={i}
                            />
                        ))}
                        <div className='absolute right-1/2 top-1/2 h-[0.5px] w-10 -translate-y-1/2 translate-x-1/2 -rotate-45 rounded-full bg-gray-400' />
                        <div className='absolute bottom-1 left-[60%] text-sm' children={meta.last_page} />
                    </div>
                </div>
                {links.next ? (
                    <Link
                        // to={links.next}
                        onClick={() => setUrl(links.next)}
                        className='grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-primary shadow-[8.05051px_24.1515px_89.4501px_-11.6285px_rgba(22,52,80,0.05)] backdrop-blur-xl transition duration-300 hover:bg-primary/80'>
                        <Icon
                            name={'IconChevronRight'}
                            className='h-6 w-6 stroke-primary-foreground stroke-[1.6]'
                        />
                    </Link>
                ) : (
                    <div className='grid h-10 w-10 place-items-center rounded-full bg-primary/20 shadow-[8.05051px_24.1515px_89.4501px_-11.6285px_rgba(22,52,80,0.05)] backdrop-blur-xl transition duration-300'>
                        <Icon
                            name={'IconChevronRight'}
                            className='h-6 w-6 stroke-primary-foreground stroke-[1.6]'
                        />
                    </div>
                )}
                {meta.to !== meta.total && (
                    <Link
                        // to={links.last}
                        onClick={() => setUrl(links.last)}
                        className='grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-primary shadow-[8.05051px_24.1515px_89.4501px_-11.6285px_rgba(22,52,80,0.05)] backdrop-blur-xl transition duration-300 hover:bg-primary/80'>
                        <Icon
                            name={'IconChevronsRight'}
                            className='h-6 w-6 stroke-primary-foreground stroke-[1.6]'
                        />
                    </Link>
                )}
            </div>
        </div>
    );
}
