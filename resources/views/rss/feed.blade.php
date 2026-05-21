<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Hollow Press</title>
        <link>{{ $baseUrl }}</link>
        <description>A sanctuary for artists who find beauty in the unconventional.</description>
        <language>en-us</language>
        <lastBuildDate>{{ now()->format('D, d M Y H:i:s O') }}</lastBuildDate>
        <atom:link href="{{ $baseUrl }}/feed.rss" rel="self" type="application/rss+xml"/>
@foreach($posts as $post)
        <item>
            <title><![CDATA[{{ $post->title }}]]></title>
            <link>{{ $baseUrl }}/posts/{{ $post->id }}</link>
            <description><![CDATA[{{ $post->content }}]]></description>
            <pubDate>{{ $post->created_at->format('D, d M Y H:i:s O') }}</pubDate>
            <guid isPermaLink="true">{{ $baseUrl }}/posts/{{ $post->id }}</guid>
        </item>
@endforeach
    </channel>
</rss>
