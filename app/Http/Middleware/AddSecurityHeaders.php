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
        assert($response instanceof Response);

        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
        $response->headers->set('X-Permitted-Cross-Domain-Policies', 'none');
        $response->headers->set('Cross-Origin-Resource-Policy', 'same-site');
        $response->headers->remove('X-Powered-By');

        if ($request->isSecure()) {
            $response->headers->set('Cross-Origin-Opener-Policy', 'same-origin');
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        }

        $isNonProd = app()->environment('local', 'testing');

        $csp = "default-src 'self'";
        if ($isNonProd) {
            $csp .= ' http:';
        }
        $csp .= "; script-src 'self' 'unsafe-inline'";
        if ($isNonProd) {
            $csp .= ' http:';
        }
        $csp .= "; style-src 'self' 'unsafe-inline' https://fonts.bunny.net";
        if ($isNonProd) {
            $csp .= ' http:';
        }
        $csp .= "; img-src 'self' data: https:";
        if ($isNonProd) {
            $csp .= ' http:';
        }
        $csp .= "; font-src 'self' data: https://fonts.bunny.net";
        if ($isNonProd) {
            $csp .= ' http:';
        }
        $csp .= "; connect-src 'self' https:";
        if ($isNonProd) {
            $csp .= ' http: ws: wss:';
        }
        $csp .= "; frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self';";

        $response->headers->set('Content-Security-Policy', $csp);

        return $response;
    }
}
