<?php

use App\Http\Controllers\Api\MessageProxyController;
use Illuminate\Support\Facades\Route;

Route::get('/messages', [MessageProxyController::class, 'index']);
Route::patch('/messages/read-all', [MessageProxyController::class, 'markAllRead']);
Route::patch('/messages/{id}/read', [MessageProxyController::class, 'markRead']);
