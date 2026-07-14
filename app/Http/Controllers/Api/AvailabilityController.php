<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AvailabilityController extends Controller
{
    public function checkAvailability(Request $request, Room $room): JsonResponse
    {
        $validated = $request->validate([
            'check_in_on' => 'required|date',
            'check_out_on' => 'required|date|after:check_in_on',
        ]);

        $overlapping = $room->bookings()
            ->where('check_in_on', '<', $validated['check_out_on'])
            ->where('check_out_on', '>', $validated['check_in_on'])
            ->exists();

        return response()->json([
            'available' => !$overlapping,
        ], 200);
    }
}
