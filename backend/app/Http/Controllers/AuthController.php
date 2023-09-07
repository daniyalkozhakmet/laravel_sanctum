<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // use HttpResponses;
    //
    public function login(LoginUserRequest $request)
    {

        if (!Auth::attempt($request->only(['email', 'password']))) {
            return $this->error('', 'Credentials do not match', 401);
        }

        $user = User::where('email', $request->email)->first();
        return new UserResource($user);
        // return $this->success([
        //     'user' => $user,
        //     'role' => $user->roles,
        //     'token' => $user->createToken('API Token')->plainTextToken
        // ]);
        //
    }
    public function register(RegisterUserRequest $request)
    {
        $request->validated($request->only(['name', 'email', 'password']));

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        // $user->roles()->attach(Role::where('name', 'USER')->first());
        return new UserResource($user);
        // return $this->success([
        //     'user' => $user,
        //     'role' => $user->roles,
        //     'token' => $user->createToken('API Token')->plainTextToken
        // ]);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->success([
            'message' => 'You have succesfully been logged out and your token has been removed'
        ]);
        //
    }
    public function profile(Request $request)
    {
        $current_user = $request->user();
        $user = User::where('email', $current_user->email)->first();
        return new UserResource($user);
        return 'Hello';
    }
    protected function success($data, string $message = null, int $code = 200)
    {
        return response()->json([
            'status' => 'Request was successful.',
            'message' => $message,
            'data' => $data
        ], $code);
    }

    protected function error($data, string $message = null, int $code)
    {
        return response()->json([
            'status' => 'An error has occurred...',
            'message' => $message,
            'data' => $data
        ], $code);
    }
}
