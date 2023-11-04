import AppContainer from '@/components/app-container';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import AuthLayout from '@/layouts/auth-layout';
import { rupiahFormat } from '@/lib/helpers';
import axios from '@/services/api/axios';
import { userCartCount } from '@/services/store';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

export default function Cart() {
    const [carts, setCarts] = useRecoilState(userCartCount);
    const [total, setTotal] = useState('');

    const deleteCartHandler = async (i) => {
        const { data } = await axios.delete(`/api/remove-cart/${carts[i].id}`);
        toast({
            title: 'Success',
            description: `${data.message}`,
        });
        setCarts(carts.filter((cart) => cart !== carts[i]));
        setTotal(total - carts[i].price);
    };

    const checkoutHandler = async () => {
        const { data } = await axios.post('/api/orders/store');
        window.open(data.redirect_url);
    };

    useEffect(() => {
        let cartTotal = carts.map((cart) => cart.price).reduce((x, y) => x + y, 0);
        setTotal(cartTotal);
    }, [total, carts]);

    return (
        <AuthLayout title={'Your carts'}>
            <AppContainer className={'my-40'}>
                <Card>
                    <CardHeader>
                        <CardTitle>Your Cart</CardTitle>
                        <CardDescription>list of playlist that has been added to your carts.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='w-[100px]'>#</TableHead>
                                    <TableHead>Playlist</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {carts.length ? (
                                    <>
                                        {carts.map((cart, i) => (
                                            <TableRow key={i}>
                                                <TableCell className='font-medium'>{i + 1}</TableCell>
                                                <TableCell>
                                                    <Link
                                                        to={`/series/${cart.playlist.slug}`}
                                                        className='font-semibold text-foreground hover:underline'>
                                                        {cart.playlist.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{rupiahFormat(cart.price)}</TableCell>
                                                <TableCell className='text-right'>
                                                    <Button
                                                        variant='destructive'
                                                        size='icon'
                                                        onClick={() => deleteCartHandler(i)}>
                                                        <Icon name={'IconTrash'} />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={2} className='font-semibold text-foreground'>
                                                Total
                                            </TableCell>
                                            <TableCell className='font-semibold'>
                                                {rupiahFormat(total)}
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <Button onClick={checkoutHandler}>Checkout</Button>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className='animate-pulse py-5 text-center text-base font-semibold text-destructive'>
                                            You don&apos;t have playlist in your carts.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </AppContainer>
        </AuthLayout>
    );
}
