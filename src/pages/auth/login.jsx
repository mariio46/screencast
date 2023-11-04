import InputError from '@/components/input-error';
import PrimaryLink from '@/components/primary-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/guest-layout';
import axios from '@/services/api/axios';
import { authenticatedUser, userCartCount } from '@/services/store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export default function Login() {
    const navigate = useNavigate();
    const setAuth = useSetRecoilState(authenticatedUser);
    const setUserCartCount = useSetRecoilState(userCartCount);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [remember, setRememberMe] = useState(false);
    let credentials = { email, password, remember };

    const submitHadler = async (e) => {
        e.preventDefault();
        try {
            await axios.get('/sanctum/csrf-cookie');
            let { data } = await axios.post('/login', credentials);
            let carts = await axios.get('/api/carts');
            setAuth({ user: data.user, check: true });
            setUserCartCount(carts.data);
            navigate('/dashboard');
        } catch ({ response }) {
            setErrors(response.data.errors);
        }
    };
    return (
        <GuestLayout title='Login' description='Welcome back, enter your credentials to continue.'>
            <form onSubmit={submitHadler}>
                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        autoComplete='email'
                        className='mt-1 block w-full'
                        required
                    />
                    {errors.email && <InputError message={errors.email[0]} className='mt-2' />}
                </div>

                <div className='mt-4'>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        id='password'
                        name='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='password'
                        className='mt-1 block w-full'
                        required
                    />
                    {errors.password && <InputError message={errors.password[0]} className='mt-2' />}
                </div>

                <div className='mt-4 block'>
                    <label className='flex items-center'>
                        <Checkbox
                            name='remember'
                            checked={remember}
                            onCheckedChange={(e) => setRememberMe(e)}
                        />
                        <span className='ml-2 text-sm text-muted-foreground'>Remember me</span>
                    </label>
                </div>

                <div className='mt-4 flex items-center justify-between'>
                    <PrimaryLink to={'/'} value={'home'} />
                    <div>
                        <PrimaryLink to={'/register'} value={'register?'} />
                        <Button className='ml-4'>Log in</Button>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
