<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccommodationResource;
use App\Models\Accommodation;
use Illuminate\Http\JsonResponse;


class AccommodationController extends Controller
{
    public function index(): JsonResponse
    {
        $accommodations = AccommodationResource::collection(Accommodation::with('rooms')->get());

        return response()->json(['data' => $accommodations], 200);
    }
}
