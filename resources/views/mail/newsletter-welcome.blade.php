<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Hollow Press</title>
    <style>
        body { font-family: sans-serif; color: #333; background: #f9f9f9; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .header { background: #111; color: #fff; padding: 24px 32px; }
        .header h1 { margin: 0; font-size: 22px; }
        .body { padding: 32px; line-height: 1.7; color: #333; }
        .body p { margin: 0 0 16px; }
        .footer { padding: 16px 32px; background: #f5f5f5; font-size: 12px; color: #999; }
        .footer a { color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Hollow Press</h1>
        </div>
        <div class="body">
            <p>Thanks for subscribing! You're now part of the Hollow Press community — a space for independent artists and creators.</p>
            <p>You'll hear from us when there's something worth reading: new stories, featured artists, and creative perspectives worth your time.</p>
            <p>Talk soon,<br>The Hollow Press team</p>
        </div>
        <div class="footer">
            You're receiving this because you subscribed at hollowpress.graveyardjokes.com.
            <a href="{{ url('/newsletter/unsubscribe/' . $subscriber->unsubscribe_token) }}">Unsubscribe</a>
        </div>
    </div>
</body>
</html>
