<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/admin', function () {
    return Inertia::render('Admin');
})->name('admin');

Route::get('/guest', function () {
    return Inertia::render('Guest');
})->name('guest');
