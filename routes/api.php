<?php

use App\Http\Controllers\Api\AccommodationController;
use App\Http\Controllers\Api\AvailabilityController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\RoomController;
use Illuminate\Support\Facades\Route;


Route::apiResource('/bookings', BookingController::class);

/*
ENDPOINTS
GET http://127.0.0.1:8000/api/bookings - showing all bookings
POST http://127.0.0.1:8000/api/bookings - create a booking
GET http://127.0.0.1:8000/api/bookings/{uuid} - show one booking (confirmation)
*/

Route::post('/rooms/{room}/availability', [AvailabilityController::class, 'checkAvailability']);
Route::get('/rooms/{room}/rates', [RoomController::class, 'rates']);
Route::apiResource('/accommodations', AccommodationController::class);
