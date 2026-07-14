<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\AccommodationResource;

/**
 * @mixin \App\Models\Room
 */

class RoomResource extends JsonResource
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
            'name' => $this->name,
            'type' => $this->type,
            'description' => $this->description,
            'max_guests' => $this->max_guests,
            'accommodation' => new AccommodationResource($this->whenLoaded('accommodation')),
        ];
    }
}
