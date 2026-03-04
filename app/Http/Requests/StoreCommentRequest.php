<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'author_name' => 'required|string|max:255',
            'content' => 'required|string|min:3|max:2000',
        ];
    }

    public function messages(): array
    {
        return [
            'author_name.required' => 'Your name is required.',
            'author_name.max' => 'Your name may not be greater than 255 characters.',
            'content.required' => 'Please write a comment before submitting.',
            'content.min' => 'Comments must be at least 3 characters.',
            'content.max' => 'Comments may not be greater than 2000 characters.',
        ];
    }
}
