import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import MainLayout from '../Layouts/MainLayout';
import BookingForm from '@/components/BookingForm';

export default function Booking() {
    const params = new URLSearchParams(window.location.search);
    const roomUuid = params.get('room');
    const roomName = params.get('room_name');
    const checkIn = params.get('check_in');
    const checkOut = params.get('check_out');
    const total = Number(params.get('total'));

    const [confirmedBooking, setConfirmedBooking] = useState(null);

    function handleBookingSuccess(booking) {
        setConfirmedBooking(booking);

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
        });

        setTimeout(() => {
            router.visit('/admin');
        }, 2500);
    }

    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Confirm Your Booking
                </h2>
            }
        >
            <Head title="Booking" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    {!roomUuid && (
                        <p className="text-red-600">No room selected.</p>
                    )}

                  {roomUuid && !confirmedBooking && (
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h3 className="mb-1 text-lg font-semibold text-[#4D4D4D]">
                            {roomName || 'Selected room'}
                        </h3>
                        <p className="text-sm text-[#4D4D4D]">
                            {checkIn} → {checkOut}
                        </p>
                        <p className="mb-4 text-sm text-[#4D4D4D]">
                            Total: ${total.toFixed(2)}
                        </p>

                            <BookingForm
                                roomUuid={roomUuid}
                                startDate={checkIn}
                                endDate={checkOut}
                                totalPrice={total}
                                onSuccess={handleBookingSuccess}
                            />
                        </div>
                    )}

                    {confirmedBooking && (
                        <div className="rounded-lg border border-[#6FBE44] bg-white p-6 text-center shadow">
                            <h3 className="mb-2 text-xl font-semibold text-[#6FBE44]">
                                🎉 Your booking is created successfully!
                            </h3>
                            <p className="text-sm text-[#4D4D4D]">Redirecting to bookings overview…</p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}