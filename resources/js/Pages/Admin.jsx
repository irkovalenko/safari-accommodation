import { Head} from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

export default function Admin() {

    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Page
                </h2>
            }
        >
            <Head title="Admin" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <p className="text-gray-800">This is admin page</p>
                </div>
            </div>
        </MainLayout>
    );
}