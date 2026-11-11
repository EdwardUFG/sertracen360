<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_seeded_users_can_authenticate_using_their_document_identity(): void
    {
        $this->seed(UserSeeder::class);

        $response = $this->post('/login', [
            'documento_identidad' => '0614-010190-101-1',
            'password' => 'password123',
        ]);

        $this->assertAuthenticatedAs(User::query()->findOrFail('0614-010190-101-1'));
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    public function test_failed_document_identity_login_returns_error_for_that_field(): void
    {
        $this->seed(UserSeeder::class);

        $response = $this->post('/login', [
            'documento_identidad' => '0614-010190-101-1',
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
        $response->assertSessionHasErrors([
            'documento_identidad' => 'Las credenciales ingresadas no son correctas.',
        ]);
    }

    public function test_login_validation_messages_are_in_spanish(): void
    {
        $response = $this->post('/login', [
            'documento_identidad' => '',
            'password' => '',
        ]);

        $response->assertSessionHasErrors([
            'documento_identidad' => 'Ingresa tu documento de identidad o correo electrónico.',
            'email' => 'Ingresa tu documento de identidad o correo electrónico.',
            'password' => 'Ingresa tu contraseña.',
        ]);
    }

    public function test_login_throttle_message_is_in_spanish(): void
    {
        $user = User::factory()->create();

        for ($attempt = 0; $attempt < 6; $attempt++) {
            $response = $this->post('/login', [
                'email' => $user->email,
                'password' => 'wrong-password',
            ]);
        }

        $response->assertSessionHasErrors('email');

        $message = app('session.store')
            ->get('errors')
            ->getBag('default')
            ->first('email');

        $this->assertStringStartsWith(
            'Has realizado demasiados intentos de inicio de sesión. Inténtalo nuevamente en ',
            $message
        );
        $this->assertStringEndsWith(' segundos.', $message);
    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }
}
