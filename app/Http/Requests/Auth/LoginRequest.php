<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'documento_identidad' => ['nullable', 'required_without:email', 'string'],
            'email' => ['nullable', 'required_without:documento_identidad', 'string', 'email'],
            'password' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'documento_identidad.required_without' => 'Ingresa tu documento de identidad o correo electrónico.',
            'documento_identidad.string' => 'El documento de identidad debe ser texto.',
            'email.required_without' => 'Ingresa tu documento de identidad o correo electrónico.',
            'email.email' => 'Ingresa un correo electrónico válido.',
            'email.string' => 'El correo electrónico debe ser texto.',
            'password.required' => 'Ingresa tu contraseña.',
            'password.string' => 'La contraseña debe ser texto.',
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        Log::channel('login')->warning('Solicitud de inicio de sesión inválida', [
            'campos' => array_keys($validator->errors()->messages()),
        ]);

        parent::failedValidation($validator);
    }

    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        $credentialField = $this->credentialField();

        if (! Auth::attempt([
            $credentialField => $this->string($credentialField)->toString(),
            'password' => $this->string('password')->toString(),
        ], $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());
            Log::channel('login')->warning('Inicio de sesión rechazado: credenciales incorrectas', [
                'tipo_identificador' => $credentialField,
            ]);

            throw ValidationException::withMessages([
                $credentialField => 'Las credenciales ingresadas no son correctas.',
            ]);
        }

        RateLimiter::clear($this->throttleKey());
        Log::channel('login')->info('Inicio de sesión exitoso', [
            'tipo_identificador' => $credentialField,
        ]);
    }

    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());
        Log::channel('login')->warning('Inicio de sesión bloqueado por exceso de intentos', [
            'tipo_identificador' => $this->credentialField(),
            'segundos_restantes' => $seconds,
        ]);

        throw ValidationException::withMessages([
            $this->credentialField() => "Has realizado demasiados intentos de inicio de sesión. Inténtalo nuevamente en {$seconds} segundos.",
        ]);
    }

    private function credentialField(): string
    {
        return $this->filled('documento_identidad') ? 'documento_identidad' : 'email';
    }

    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string($this->credentialField())).'|'.$this->ip());
    }
}
