<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Background styling is handled in `resources/css/app.css` now --}}

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        {{-- Default SEO Meta Tags --}}
        <meta name="description" content="Hollow Press - A sanctuary for artists who find beauty in the unconventional. Discover unique stories, music, and creative expressions from independent artists.">
        <meta name="keywords" content="artist blog, creative platform, independent artists, music blog, art showcase, creative writing">
        <meta name="author" content="Hollow Press">
        
        {{-- Open Graph Defaults --}}
        <meta property="og:site_name" content="Hollow Press">
        <meta property="og:locale" content="en_US">
        
        {{-- Favicon --}}
        <link rel="icon" href="/favicon.ico" sizes="any">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
