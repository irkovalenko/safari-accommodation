<?php

use App\Http\Controllers\Api\BookingController;
use Illuminate\Support\Facades\Route;


Route::apiResource('/bookings', BookingController::class);

/*
ENDPOINTS
GET http://127.0.0.1:8000/api/bookings - showing all bookings
POST http://127.0.0.1:8000/api/bookings - create a booking
GET http://127.0.0.1:8000/api/bookings/{uuid} - show one booking (confirmation)
*/