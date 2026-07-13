<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Room extends Model
{
    use HasUuids;
    protected $primaryKey = 'uuid';
    protected $keyType = 'string';
    protected $fillable = [
        'name',
        'accommodation_uuid',
        'type',
        'description',
        'max_guests'
    ];

    public function accommodation(): BelongsTo
    {
        return $this->belongsTo(Accommodation::class, 'accommodation_uuid', 'uuid');
    }

    public function rate(): HasOne
    {
        return $this->hasOne(Rate::class, 'room_uuid', 'uuid');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'room_uuid', 'uuid');
    }
}
