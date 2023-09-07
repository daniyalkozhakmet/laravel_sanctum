<?php

namespace App\Http\Resources;

use App\Enums\TokenAbility;
use DateTime;
use DateTimeImmutable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $accessToken = $this->createToken('access_token', [TokenAbility::ACCESS_API->value], $this->formatDate(config('sanctum.expiration')));
        $refreshToken = $this->createToken('refresh_token', [TokenAbility::ISSUE_ACCESS_TOKEN->value], $this->formatDate(config('sanctum.rt_expiration')));
        // $accessToken = $this->createToken('access_token', [TokenAbility::ACCESS_API->value]);
        // $refreshToken = $this->createToken('refresh_token', [TokenAbility::ISSUE_ACCESS_TOKEN->value]);
        // return [
        //     'token' => $accessToken->plainTextToken,
        //     'refresh_token' => $refreshToken->plainTextToken,
        // ];
        return [
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->roles,
            'accessToken' => $accessToken->plainTextToken,
            'refreshToken' => $refreshToken->plainTextToken,

        ];
    }
    public function formatDate($second)
    {
        return new DateTimeImmutable(date("Y-m-d H:i:s", time() + $second));
    }
}
