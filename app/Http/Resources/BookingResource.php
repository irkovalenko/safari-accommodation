<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,
            'guest_name' => $this->guest_name,
            'email' => $this->email,
            'number_of_guests' => $this->number_of_guests,
            'check_in_on' => $this->check_in_on,
            'check_out_on' => $this->check_out_on,
            'total_price' => $this->total_price,
            'room' => new RoomResource($this->whenLoaded('room')),
            'booked_on' => $this->booked_on?->format('Y-m-d'),
        ];
    }
}
