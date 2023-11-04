import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { buttonVariants } from './ui/button';

export default function ErrorScreen({ error, redirect, redirectName }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>You are not buy this series</CardTitle>
            </CardHeader>
            <CardContent>
                <h2 className='animate-pulse text-2xl font-bold text-red-500'>{error ?? 'Not Found...!'}</h2>
            </CardContent>
            <CardFooter>
                <Link to={redirect} className={buttonVariants({ variant: 'outline' })}>
                    {redirectName ?? 'Back'}
                </Link>
            </CardFooter>
        </Card>
    );
}
