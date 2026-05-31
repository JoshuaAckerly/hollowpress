<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string|min:10',
            'author_name' => 'required|string|max:255',
            'author_type' => 'required|in:artist,user',
            'featured_image' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'title.required' => 'The title field is required.',
            'title.max' => 'The title may not be greater than 255 characters.',
            'content.required' => 'The content field is required.',
            'content.min' => 'The content must be at least 10 characters.',
            'author_name.required' => 'The author name field is required.',
            'author_type.required' => 'Please select an author type.',
            'author_type.in' => 'The author type must be either artist or user.',
            'featured_image.image' => 'The featured image must be an image file.',
            'featured_image.mimes' => 'The featured image must be a JPG, PNG, GIF, or WebP.',
            'featured_image.max' => 'The featured image may not be larger than 2MB.',
            'tags.array' => 'Tags must be an array.',
            'tags.*.max' => 'Each tag may not be greater than 50 characters.',
        ];
    }
}
