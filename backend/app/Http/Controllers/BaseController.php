<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class BaseController extends Controller
{

    const MESSAGE_ERROR = [
      "This action is unauthorized." => [
          "code" => 401,
          "message" => "unauthorized."
      ],
    ];

    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendResponse($result, $message, $code = 200)
    {
        $response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];


        return response()->json($response, $code);
    }


    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];


        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }

        if (array_key_exists($error, self::MESSAGE_ERROR)) {
            $code = self::MESSAGE_ERROR[$error]['code'];
        }


        return response()->json($response, $code);
    }
}