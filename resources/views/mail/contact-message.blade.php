<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Message</title>
    <style>
        body { font-family: sans-serif; color: #333; background: #f9f9f9; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .header { background: #111; color: #fff; padding: 24px 32px; }
        .header h1 { margin: 0; font-size: 20px; }
        .body { padding: 32px; }
        .field { margin-bottom: 20px; }
        .label { font-size: 12px; font-weight: 600; text-transform: uppercase; color: #888; margin-bottom: 4px; }
        .value { font-size: 15px; color: #111; }
        .message-box { background: #f5f5f5; border-radius: 6px; padding: 16px; white-space: pre-wrap; line-height: 1.6; }
        .footer { padding: 16px 32px; background: #f5f5f5; font-size: 12px; color: #999; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Form Message</h1>
        </div>
        <div class="body">
            <div class="field">
                <div class="label">From</div>
                <div class="value">{{ $formData['name'] }} &lt;{{ $formData['email'] }}&gt;</div>
            </div>
            <div class="field">
                <div class="label">Subject</div>
                <div class="value">{{ $formData['subject'] }}</div>
            </div>
            <div class="field">
                <div class="label">Message</div>
                <div class="value message-box">{{ $formData['message'] }}</div>
            </div>
        </div>
        <div class="footer">
            Sent via the Hollow Press contact form. Reply directly to this email to respond.
        </div>
    </div>
</body>
</html>
