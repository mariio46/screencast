import reactLogo from '@/assets/react.svg';
import { buttonVariants } from '@/components/ui/button';
import axios from '@/services/api/axios';
import { authenticatedUser, userCartCount } from '@/services/store';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Icon } from './icon';
import NavigationLink from './nav-link';
import { ThemeToggle } from './theme-toggle';
import { Avatar, AvatarImage } from './ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function Navigation() {
    const navigate = useNavigate();
    const [auth, setAuth] = useRecoilState(authenticatedUser);
    const [carts, setCarts] = useRecoilState(userCartCount);

    const logoutHandler = async () => {
        await axios.post('/logout');
        setAuth({
            check: false,
            user: [],
        });
        setCarts([]);
        navigate('/login');
    };
    return (
        <header className='relative z-[50] hidden md:block'>
            <div className='fixed left-1/2 top-0 h-[4.5rem] w-full -translate-x-1/2'>
                <nav className='border-b border-border/80 bg-background px-6 py-5 backdrop-blur'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-x-8'>
                            <Link to={'/'}>
                                <img
                                    src={reactLogo}
                                    alt='React Logo'
                                    className='animate-spin [animation-duration:5s]'
                                />
                            </Link>
                            <div className='flex items-center gap-x-4'>
                                <NavigationLink url='/' value={'home'} />
                                <NavigationLink url='/series' value={'series'} />
                            </div>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <ThemeToggle />
                            {!auth.check ? (
                                <>
                                    <Link
                                        to={'/login'}
                                        className={buttonVariants({
                                            variant: 'outline',
                                            size: 'default',
                                            className: 'h-[2.7rem]',
                                        })}>
                                        Login
                                    </Link>
                                    <Link
                                        to={'/register'}
                                        className={buttonVariants({
                                            variant: 'outline',
                                            size: 'default',
                                            className: 'h-[2.7rem]',
                                        })}>
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to={'/carts'}
                                        className={buttonVariants({
                                            variant: 'outline',
                                            size: 'icon',
                                            className:
                                                'relative h-[2.7rem] w-[2.7rem] items-center gap-x-1 text-foreground',
                                        })}>
                                        <Icon
                                            name={'IconShoppingCart'}
                                            className={'h-[1.35rem] w-[1.35rem]'}
                                        />
                                        <span className='absolute -right-2 -top-2 inline-flex items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white'>
                                            {carts.length}
                                        </span>
                                    </Link>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className={'select-none outline-none'}>
                                            <Avatar className='h-[2.7rem] w-[2.7rem]'>
                                                <AvatarImage src={`${auth.user.avatar}`} />
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='end' className={'mt-3 w-64 space-y-2'}>
                                            <DropdownMenuLabel>
                                                <h4 className='block'>{`${auth.user.name}`}</h4>
                                                <span className='text-xs font-normal'>{`${auth.user.email}`}</span>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link to='/'>
                                                    <Icon name={'IconHome2'} />
                                                    Home
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link to='/dashboard'>
                                                    <Icon name={'IconChartPie2'} />
                                                    Dashboard
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onSelect={logoutHandler} className='!mb-1'>
                                                <Icon name={'IconLogout'} />
                                                Log out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
