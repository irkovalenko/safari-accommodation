import { Head} from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

export default function Guest() {

    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Guest Page
                </h2>
            }
        >
            <Head title="Guest" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <p className="text-gray-800">This is guest page</p>
                </div>
            </div>
        </MainLayout>
    );
}