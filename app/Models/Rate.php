<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rate extends Model
{
    use HasUuids;
    protected $primaryKey = 'uuid';
    protected $keyType = 'string';
    protected $fillable = [
        'room_uuid',
        'start_date',
        'end_date',
        'price_per_night'
    ];

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class, 'room_uuid', 'uuid');
    }
}
