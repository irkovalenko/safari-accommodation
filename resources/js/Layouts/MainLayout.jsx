import NavLink from '@/components/NavLink';

export default function MainLayout({ header, children }) {

    return (
        <div className="min-h-screen bg-[#EAF3E6]">
            <nav className="bg-[#1A1A1A]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">

                            <div className="hidden space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    href={route('admin')}
                                    active={route().current('admin')}
                                    className="text-white hover:text-[#6FBE44]"
                                >
                                    Admin Page
                                </NavLink>
                                <NavLink
                                    href={route('guest')}
                                    active={route().current('guest')}
                                    className="text-white hover:text-[#6FBE44]"
                                >
                                    Guest Page
                                </NavLink>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>

            <main className="text-[#4D4D4D]">{children}</main>
        </div>
    );
}