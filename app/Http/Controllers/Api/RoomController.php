<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RateResource;
use App\Models\Room;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RoomController extends Controller
{

    public function rates(Room $room): AnonymousResourceCollection
    {
        return RateResource::collection(
            $room->rates()->orderBy('start_date')->get()
        );
    }
}
