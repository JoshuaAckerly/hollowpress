<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureDashboardAdminToken
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $expectedToken = (string) config('services.dashboard.admin_token', '');

        $providedToken = (string) (
            $request->header('X-Dashboard-Token')
            ?? $request->input('dashboard_token', '')
        );

        if ($expectedToken === '' || $providedToken === '' || !hash_equals($expectedToken, $providedToken)) {
            abort(403, 'Forbidden. Valid dashboard token required.');
        }

        return $next($request);
    }
}
