import { useState } from 'react';
import Button from '@/components/Button';

export default function BookingForm({ roomUuid, startDate, endDate, totalPrice, onSuccess }) {
    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);

    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError(null);

        fetch('/api/bookings', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                guest_name: guestName,
                email: guestEmail,
                room_uuid: roomUuid,
                number_of_guests: Number(numberOfGuests),
                check_in_on: startDate,
                check_out_on: endDate,
                total_price: totalPrice,
            }),
        })
            .then(async (res) => {
                const json = await res.json();
                if (!res.ok) {
                    throw new Error(json.message || `Request failed with status ${res.status}`);
                }
                return json;
            })
            .then((json) => onSuccess(json.data))
            .catch((err) => setSubmitError(err.message))
            .finally(() => setSubmitting(false));
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 border-t border-gray-200 pt-4">
            <div>
                <label className="mb-1 block text-sm font-medium text-[#4D4D4D]">Guest name</label>
                <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-[#4D4D4D]"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-[#4D4D4D]">Email</label>
                <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-[#4D4D4D]"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-[#4D4D4D]">Number of guests</label>
                <input
                    type="number"
                    min={1}
                    required
                    value={numberOfGuests}
                    onChange={(e) => setNumberOfGuests(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-[#4D4D4D]"
                />
            </div>

            {submitError && <p className="text-sm text-red-600">Error: {submitError}</p>}

            <Button type="submit" loading={submitting} loadingText="Booking…">
                Confirm Booking
            </Button>
        </form>
    );
}