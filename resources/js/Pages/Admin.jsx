import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import MainLayout from '../Layouts/MainLayout';

export default function Admin() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/bookings', {
            headers: { Accept: 'application/json' },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Request failed with status ${res.status}`);
                }
                return res.json();
            })
            .then((json) => setBookings(json.data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

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
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {loading && <p className="text-white">Loading bookings…</p>}

                    {error && (
                        <p className="text-red-600">Failed to load bookings: {error}</p>
                    )}

                    {!loading && !error && bookings.length === 0 && (
                        <p className="text-white">No bookings yet.</p>
                    )}

                    {!loading && !error && bookings.length > 0 && (
                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-[#1A1A1A]">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-white">Guest</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-white">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-white">Accommodation</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-white">Room</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-white">Check-in</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-white">Check-out</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-white">Guests</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-white">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {bookings.map((booking) => (
                                        <tr key={booking.uuid}>
                                            <td className="px-6 py-4 text-sm text-black">
                                                {booking.guest_name}
                                                <br />
                                                <span className="text-xs text-gray-400">{booking.email}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-black">
                                                {booking.room?.accommodation?.location}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-black">
                                                {booking.room?.accommodation?.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-black">
                                                {booking.room?.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-black">
                                                {booking.check_in_on}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-black">
                                                {booking.check_out_on}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-black">
                                                {booking.number_of_guests}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-black">
                                                ${booking.total_price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}