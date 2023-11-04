import Navigation from '@/components/navigation';
import { Toaster } from '@/components/ui/toaster';

export default function AuthLayout({ children, title }) {
    document.title = `${title} / Screencast`;
    return (
        <>
            {/* <Head title={title} /> */}
            <Navigation />
            <div className='mt-[90px]' />
            <main className='min-h-screen'>{children}</main>
            <Toaster />
        </>
    );
}
