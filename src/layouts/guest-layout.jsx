import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function GuestLayout({ children, title, description }) {
    document.title = `${title} / Screencast`;
    return (
        <>
            {/* <Head title={title} /> */}
            <main className='flex min-h-screen items-center justify-center'>
                <Card className='w-full max-w-md'>
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardContent>{children}</CardContent>
                </Card>
            </main>
        </>
    );
}
