<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasUuids;
    protected $primaryKey = 'uuid';
    protected $keyType = 'string';
    protected $fillable = [
        'guest_name',
        'email',
        'number_of_guests',
        'check_in_on',
        'check_out_on',
        'room_uuid',
        'total_price'
    ];

    const CREATED_AT = 'booked_on';

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class, 'room_uuid', 'uuid');
    }
}
