import { Head, router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import MainLayout from '../Layouts/MainLayout';
import Button from '@/components/Button';

function getRateForDate(dateStr, rates) {
    return rates.find((r) => dateStr >= r.start_date && dateStr <= r.end_date);
}

function calculateStay(startDate, endDate, rates) {
    if (!startDate || !endDate || endDate <= startDate) return null;

    const nights = [];
    let current = new Date(startDate);
    const end = new Date(endDate);

    while (current < end) {
        const dateStr = current.toISOString().slice(0, 10);
        const rate = getRateForDate(dateStr, rates);
        nights.push({ date: dateStr, price: rate ? Number(rate.price_per_night) : null });
        current.setDate(current.getDate() + 1);
    }

    const hasGap = nights.some((n) => n.price === null);
    const total = hasGap ? null : nights.reduce((sum, n) => sum + n.price, 0);

    return { nights, hasGap, total };
}

export default function Guest() {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedAccommodationUuid, setSelectedAccommodationUuid] = useState('');
    const [selectedRoomUuid, setSelectedRoomUuid] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [rates, setRates] = useState([]);
    const [ratesLoading, setRatesLoading] = useState(false);

    const [checkingAvailability, setCheckingAvailability] = useState(false);
    const [availabilityResult, setAvailabilityResult] = useState(null); // null | true | false
    const [availabilityError, setAvailabilityError] = useState(null);

    const currentYear = new Date().getFullYear();
    const yearStart = `${currentYear}-01-01`;
    const yearEnd = `${currentYear}-12-31`;

    useEffect(() => {
        fetch('/api/accommodations', {
            headers: { Accept: 'application/json' },
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
                return res.json();
            })
            .then((json) => setAccommodations(json.data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!selectedRoomUuid) {
            setRates([]);
            return;
        }

        setRatesLoading(true);
        fetch(`/api/rooms/${selectedRoomUuid}/rates`, {
            headers: { Accept: 'application/json' },
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
                return res.json();
            })
            .then((json) => setRates(json.data))
            .catch(() => setRates([]))
            .finally(() => setRatesLoading(false));
    }, [selectedRoomUuid]);

    // Reset availability whenever the selection changes, so a stale result never lingers
    useEffect(() => {
        setAvailabilityResult(null);
        setAvailabilityError(null);
    }, [selectedRoomUuid, startDate, endDate]);

    const selectedAccommodation = useMemo(
        () => accommodations.find((a) => a.uuid === selectedAccommodationUuid),
        [accommodations, selectedAccommodationUuid],
    );

    const rooms = selectedAccommodation?.rooms ?? [];

    const stay = useMemo(
        () => calculateStay(startDate, endDate, rates),
        [startDate, endDate, rates],
    );

    function handleAccommodationChange(e) {
        setSelectedAccommodationUuid(e.target.value);
        setSelectedRoomUuid('');
        setStartDate('');
        setEndDate('');
    }

    function handleRoomChange(e) {
        setSelectedRoomUuid(e.target.value);
        setStartDate('');
        setEndDate('');
    }

    function handleCheckAvailability() {
        setCheckingAvailability(true);
        setAvailabilityResult(null);
        setAvailabilityError(null);

        fetch(`/api/rooms/${selectedRoomUuid}/availability`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                check_in_on: startDate,
                check_out_on: endDate,
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
                return res.json();
            })
            .then((json) => setAvailabilityResult(json.available))
            .catch((err) => setAvailabilityError(err.message))
            .finally(() => setCheckingAvailability(false));
    }

    const datesValid = startDate && endDate && endDate > startDate;

    function handleProceedToBooking() {
    if (!stay || stay.hasGap || stay.total == null) return;

    const room = rooms.find((r) => r.uuid === selectedRoomUuid);

    const params = new URLSearchParams({
        room: selectedRoomUuid,
        room_name: room?.name ?? '',
        check_in: startDate,
        check_out: endDate,
        total: String(stay.total),
    });

    router.visit(`/booking?${params.toString()}`);
}

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
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {loading && <p className="text-[#4D4D4D]">Loading accommodations…</p>}
                    {error && <p className="text-red-600">Failed to load: {error}</p>}

                    {!loading && !error && (
                        <div className="space-y-6 rounded-lg bg-white p-6 shadow">
                            {/* Accommodation dropdown */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-[#4D4D4D]">
                                    Accommodation
                                </label>
                                <select
                                    value={selectedAccommodationUuid}
                                    onChange={handleAccommodationChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-[#4D4D4D]"
                                >
                                    <option value="">Select an accommodation…</option>
                                    {accommodations.map((acc) => (
                                        <option key={acc.uuid} value={acc.uuid}>
                                            {acc.name} — {acc.location}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Room dropdown */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-[#4D4D4D]">
                                    Room
                                </label>
                                <select
                                    value={selectedRoomUuid}
                                    onChange={handleRoomChange}
                                    disabled={!selectedAccommodationUuid}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-[#4D4D4D] disabled:bg-gray-100"
                                >
                                    <option value="">
                                        {selectedAccommodationUuid ? 'Select a room…' : 'Select an accommodation first'}
                                    </option>
                                    {rooms.map((room) => (
                                        <option key={room.uuid} value={room.uuid}>
                                            {room.name} ({room.type}, up to {room.max_guests} guests)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date filters */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-[#4D4D4D]">
                                        Check-in date
                                    </label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        min={yearStart}
                                        max={yearEnd}
                                        disabled={!selectedRoomUuid}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-[#4D4D4D] disabled:bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-[#4D4D4D]">
                                        Check-out date
                                    </label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        min={startDate || yearStart}
                                        max={yearEnd}
                                        disabled={!selectedRoomUuid}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-[#4D4D4D] disabled:bg-gray-100"
                                    />
                                </div>
                            </div>

                            {/* Check Availability button */}
                            {selectedRoomUuid && datesValid && (
                                <Button
                                    onClick={handleCheckAvailability}
                                    loading={checkingAvailability}
                                    loadingText="Checking availability…"
                                >
                                    Check Availability
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Availability + pricing results */}
                    {selectedRoomUuid && datesValid && (
                        <div className="mt-6">
                            {availabilityError && (
                                <p className="text-sm text-red-600">Error: {availabilityError}</p>
                            )}

                            {availabilityResult === false && (
                                <p className="rounded-md bg-red-50 p-4 text-sm text-red-600">
                                    Sorry, this room is not available for the selected dates. Try different dates.
                                </p>
                            )}

                            {availabilityResult === true && (
                                <div className="rounded-lg border border-[#6FBE44] bg-[#EAF3E6] p-4">
                                    <p className="rounded-md bg-green-50 p-4 text-sm text-black mb-6">
                                    The room is available.
                                </p>
                                    {ratesLoading && (
                                        <p className="text-sm text-[#4D4D4D]">Loading rates…</p>
                                    )}

                                    {!ratesLoading && stay?.hasGap && (
                                        <p className="text-sm text-red-600">
                                            Some nights in this range don't have a rate set — this stay can't be priced as selected.
                                        </p>
                                    )}

                                    {!ratesLoading && stay && !stay.hasGap && (
                                        <>
                                            <h3 className="mb-2 text-sm font-semibold text-[#4D4D4D]">
                                                Price per night
                                            </h3>
                                            <ul className="mb-3 divide-y divide-gray-200 text-sm text-[#4D4D4D]">
                                                {stay.nights.map((n) => (
                                                    <li key={n.date} className="flex justify-between py-1">
                                                        <span>{n.date}</span>
                                                        <span>${n.price.toFixed(2)}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="text-right font-semibold text-[#4D4D4D]">
                                                Total ({stay.nights.length} night{stay.nights.length !== 1 ? 's' : ''}): ${stay.total.toFixed(2)}
                                            </p>

                                            <Button onClick={handleProceedToBooking} className="mt-4">
                                                Proceed to Booking
                                            </Button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}