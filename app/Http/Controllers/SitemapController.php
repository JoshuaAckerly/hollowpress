<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Artist;
use App\Models\CaseStudy;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $baseUrl = config('app.url', 'https://hollowpress.graveyardjokes.com');
        
        // Static pages with their priorities and change frequencies
        $staticPages = [
            ['loc' => '/', 'priority' => '1.0', 'changefreq' => 'daily'],
            ['loc' => '/about', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => '/contact', 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['loc' => '/posts', 'priority' => '0.9', 'changefreq' => 'daily'],
            ['loc' => '/artists', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['loc' => '/case-studies', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['loc' => '/sponsored', 'priority' => '0.6', 'changefreq' => 'weekly'],
            ['loc' => '/demo/posts/create', 'priority' => '0.5', 'changefreq' => 'monthly'],
        ];

        // Get all posts
        $posts = Post::select('id', 'updated_at')->get();
        
        // Get all artists
        $artists = Artist::select('id', 'updated_at')->get();
        
        // Get all case studies
        $caseStudies = CaseStudy::select('slug', 'updated_at')->get();

        // Generate XML
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        // Add static pages
        foreach ($staticPages as $page) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$baseUrl}{$page['loc']}</loc>\n";
            $xml .= "    <lastmod>" . now()->toDateString() . "</lastmod>\n";
            $xml .= "    <changefreq>{$page['changefreq']}</changefreq>\n";
            $xml .= "    <priority>{$page['priority']}</priority>\n";
            $xml .= "  </url>\n";
        }

        // Add dynamic post pages
        foreach ($posts as $post) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$baseUrl}/posts/{$post->id}</loc>\n";
            $xml .= "    <lastmod>{$post->updated_at->toDateString()}</lastmod>\n";
            $xml .= "    <changefreq>weekly</changefreq>\n";
            $xml .= "    <priority>0.8</priority>\n";
            $xml .= "  </url>\n";
        }

        // Add dynamic artist pages
        foreach ($artists as $artist) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$baseUrl}/artists/{$artist->id}</loc>\n";
            $xml .= "    <lastmod>{$artist->updated_at->toDateString()}</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n";
            $xml .= "    <priority>0.7</priority>\n";
            $xml .= "  </url>\n";
        }

        // Add dynamic case study pages
        foreach ($caseStudies as $caseStudy) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$baseUrl}/case-studies/{$caseStudy->slug}</loc>\n";
            $xml .= "    <lastmod>{$caseStudy->updated_at->toDateString()}</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n";
            $xml .= "    <priority>0.7</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= "</urlset>\n";

        return response($xml, 200)
            ->header('Content-Type', 'application/xml');
    }
}
