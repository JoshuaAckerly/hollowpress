<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddSecurityHeaders
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

        if ($request->isSecure()) {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }

        $isNonProd = app()->environment('local', 'testing') || env('VITE_SERVER_ENV') !== 'production';

        $csp = "default-src 'self'";
        if ($isNonProd) {
            $csp .= ' http:';
        }
        $csp .= "; script-src 'self' 'unsafe-inline'";
        if ($isNonProd) {
            $csp .= ' http:';
        }
        $csp .= "; style-src 'self' 'unsafe-inline'";
        if ($isNonProd) {
            $csp .= ' http:';
        }
        $csp .= " https://fonts.bunny.net; img-src 'self' data: https:";
        if ($isNonProd) {
            $csp .= ' http:';
        }
        $csp .= "; font-src 'self' data: https:";
        if ($isNonProd) {
            $csp .= ' http:';
        }
        $csp .= " https://fonts.bunny.net; connect-src 'self' https: http: ws: wss:; frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self';";

        $response->headers->set('Content-Security-Policy', $csp);

        return $response;
    }
}
