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
        'max_guests',
    ];

    /**
     * @return BelongsTo<Accommodation, $this>
     */
    public function accommodation(): BelongsTo
    {
        return $this->belongsTo(Accommodation::class, 'accommodation_uuid', 'uuid');
    }

    /**
     * @return HasOne<Rate, $this>
     */
    public function rate(): HasMany
    {
        return $this->hasMany(Rate::class, 'room_uuid', 'uuid');
    }

    /**
     * @return HasMany<Booking, $this>
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'room_uuid', 'uuid');
    }
}
