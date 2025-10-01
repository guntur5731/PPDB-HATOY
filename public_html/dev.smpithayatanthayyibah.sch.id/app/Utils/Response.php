<?php

namespace App\Utils;
use App\Http\Controllers\Controller;

class Response extends Controller
{
    private $responseStatus = [
        'response' => [
            'status' => false,
            'code' => 500,
            'message' => '',
            'message_error' => null
        ],
        'data' => null,
    ];

    public function setStatus(bool $status = true)
    {
        $this->responseStatus['response']['status'] = $status;
    }

    public function setCode(int $code = 200)
    {
        $this->responseStatus['response']['code'] = $code;
    }

    public function setMessage(string $message = '')
    {
        $this->responseStatus['response']['message'] = $message;
    }

    public function setMessageError(string $message = '')
    {
        $this->responseStatus['response']['message_error'] = $message;
    }

    public function setData($data)
    {
        $this->responseStatus['data'] = $data;
    }

    public function sendResponse()
    {
        return response()->json($this->responseStatus, $this->responseStatus['response']['code']);
    }

}