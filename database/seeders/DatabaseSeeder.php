<?php

namespace Database\Seeders;

use App\Models\Accommodation;
use App\Models\Booking;
use App\Models\Rate;
use App\Models\Room;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $accommodation = Accommodation::create([
            'name' => 'Safari Lodge Kenya',
            'location' => 'Maasai Mara',
            'description' => 'A rustic lodge overlooking the savannah.',
        ]);

        $room = Room::create([
            'accommodation_uuid' => $accommodation->uuid,
            'name' => 'Deluxe Tent',
            'type' => 'safari_tent',
            'description' => 'Spacious tented room with private deck.',
            'max_guests' => 4,
        ]);

        // high season rate
        Rate::create([
            'room_uuid' => $room->uuid,
            'start_date' => '2026-06-01',
            'end_date' => '2026-08-31',
            'price_per_night' => 250.00,
        ]);

        // low season rate
        Rate::create([
            'room_uuid' => $room->uuid,
            'start_date' => '2026-01-01',
            'end_date' => '2026-05-31',
            'price_per_night' => 150.00,
        ]);

        Rate::create([
            'room_uuid' => $room->uuid,
            'start_date' => '2026-09-01',
            'end_date' => '2026-12-31',
            'price_per_night' => 150.00,
        ]);

        Booking::create([
            'guest_name' => 'Jane Test',
            'email' => 'jane@test.com',
            'room_uuid' => $room->uuid,
            'number_of_guests' => 2,
            'check_in_on' => '2026-08-10',
            'check_out_on' => '2026-08-15',
            'total_price' => 5000,
        ]);
    }
}
