<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MessageProxyController;

Route::get('/messages', [MessageProxyController::class, 'index']);
Route::patch('/messages/read-all', [MessageProxyController::class, 'markAllRead']);
Route::patch('/messages/{id}/read', [MessageProxyController::class, 'markRead']);
