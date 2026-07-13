<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Accommodation extends Model
{
    use HasUuids;
    protected $primaryKey = 'uuid';
    protected $keyType = 'string';
    protected $fillable = [
        'name',
        'description',
        'location'
    ];

    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class, 'accommodation_uuid', 'uuid');
    }
}
