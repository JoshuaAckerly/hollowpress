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
        $configToken = config('services.dashboard.admin_token', '');
        $expectedToken = is_string($configToken) ? $configToken : '';

        $headerToken = $request->header('X-Dashboard-Token') ?? $request->input('dashboard_token', '');
        $providedToken = is_string($headerToken) ? $headerToken : '';

        if ($expectedToken === '' || $providedToken === '' || ! hash_equals($expectedToken, $providedToken)) {
            abort(403, 'Forbidden. Valid dashboard token required.');
        }

        /** @var Response $response */
        $response = $next($request);

        return $response;
    }
}
