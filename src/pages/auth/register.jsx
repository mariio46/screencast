import InputError from '@/components/input-error';
import PrimaryLink from '@/components/primary-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/guest-layout';
import axios from '@/services/api/axios';
import { authenticatedUser } from '@/services/store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export default function Register() {
    const navigate = useNavigate();
    const setAuth = useSetRecoilState(authenticatedUser);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState([]);

    const request = { name, email, password, password_confirmation };

    const submitHadler = async (e) => {
        e.preventDefault();
        try {
            let { data } = await axios.post('/register', request);
            setAuth({ user: data.user, check: true });
            navigate('/dashboard');
        } catch ({ response }) {
            setErrors(response.data.errors);
        }
    };
    return (
        <GuestLayout title='Register' description='Hii, enter the fields below to register.'>
            <form onSubmit={submitHadler}>
                <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input
                        id='name'
                        name='name'
                        type='name'
                        autoComplete='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='mt-1 block w-full'
                        autoFocus
                        required
                    />
                    {errors.name && <InputError message={errors.name[0]} className='mt-2' />}
                </div>

                <div className='mt-4'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        autoComplete='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='mt-1 block w-full'
                    />
                    {errors.password && <InputError message={errors.password[0]} className='mt-2' />}
                </div>

                <div className='mt-4'>
                    <Label htmlFor='password_confirmation'>Confirm Password</Label>
                    <Input
                        id='password_confirmation'
                        name='password_confirmation'
                        autoComplete='password_confirmation'
                        value={password_confirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        type='password'
                        className='mt-1 block w-full'
                        required
                    />
                    {errors.password_confirmation && (
                        <InputError message={errors.password_confirmation[0]} className='mt-2' />
                    )}
                </div>

                <div className='mt-4 flex items-center justify-between'>
                    <PrimaryLink to={'/'} value={'home'} />
                    <div>
                        <PrimaryLink to={'/login'} value={'login?'} />
                        <Button className='ml-4' type='submit'>
                            Register
                        </Button>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
