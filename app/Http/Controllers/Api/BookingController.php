<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class BookingController extends Controller
{
    public function index(): JsonResponse
    {
        $bookings = BookingResource::collection(Booking::with('room.accommodation')->get());

        return response()->json(['data' => $bookings], 200);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'guest_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'room_uuid' => 'required|uuid|exists:rooms,uuid',
            'number_of_guests' => 'required|integer|min:1',
            'check_in_on' => 'required|date',
            'check_out_on' => 'required|date|after:check_in_on',
            'total_price' => 'nullable|numeric|min:0',
        ]);

        $booking = Booking::create($validated);

        return response()->json([
            'data' => new BookingResource($booking->load('room.accommodation')),
        ], 201);
    }
}
