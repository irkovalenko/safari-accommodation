<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;


class BookingController extends Controller
{
    public function index(): JsonResponse
    {
        $bookings = BookingResource::collection(Booking::with('room.accommodation')->get());

        return response()->json(['data' => $bookings], 200);
    }
}
