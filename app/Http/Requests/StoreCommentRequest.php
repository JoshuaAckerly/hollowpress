<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Http;

class StoreCommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'author_name' => 'required|string|max:255',
            'content' => 'required|string|min:3|max:2000',
            'hcaptcha_token' => 'required|string',
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $token = $this->input('hcaptcha_token');

            if (! $token) {
                return;
            }

            $response = Http::asForm()->post('https://hcaptcha.com/siteverify', [
                'secret'   => config('services.hcaptcha.secret'),
                'response' => $token,
                'remoteip' => $this->ip(),
            ]);

            if (! $response->successful() || ! $response->json('success')) {
                $validator->errors()->add('hcaptcha_token', 'CAPTCHA verification failed. Please try again.');
            }
        });
    }

    public function messages(): array
    {
        return [
            'author_name.required'   => 'Your name is required.',
            'author_name.max'        => 'Your name may not be greater than 255 characters.',
            'content.required'       => 'Please write a comment before submitting.',
            'content.min'            => 'Comments must be at least 3 characters.',
            'content.max'            => 'Comments may not be greater than 2000 characters.',
            'hcaptcha_token.required' => 'Please complete the CAPTCHA before submitting.',
        ];
    }
}
