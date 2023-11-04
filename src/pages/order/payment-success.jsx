import AppContainer from '@/components/app-container';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AuthLayout from '@/layouts/auth-layout';
import { Link } from 'react-router-dom';

export default function PaymentSuccess() {
    return (
        <AuthLayout>
            <AppContainer className={'my-40'}>
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Succeess</CardTitle>
                        <CardDescription>Your payment has been verified</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h2 className='animate-pulse text-2xl font-bold text-green-500'>Payment Success</h2>
                    </CardContent>
                    <CardFooter>
                        <Link to={'/carts'} className={buttonVariants({ variant: 'outline' })}>
                            Back to carts
                        </Link>
                    </CardFooter>
                </Card>
            </AppContainer>
        </AuthLayout>
    );
}
