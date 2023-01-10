<?php

namespace App\Service;

use Ramsey\Uuid\Uuid;

class OrderNumberGenerator
{
    public function generate()
    {
        return strtoupper(substr(sha1(Uuid::uuid1()->toString()), 0, 8));
    }
}
