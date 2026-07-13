<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->string('guest_name');
            $table->string('email');
            $table->foreignUuid('room_uuid')->constrained('rooms', 'uuid')->onDelete('cascade');
            $table->integer('number_of_guests');
            $table->date('check_in_on');
            $table->date('check_out_on');
            $table->timestamp('booked_on')->useCurrent();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
