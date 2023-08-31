<?php

  

namespace App\Http\Controllers;

  

use Illuminate\Http\Request;

use Mail;

use App\Mail\DemoMail;

  

class MailController extends Controller

{

    /**

     * Write code on Method

     *

     * @return response()

     */

    public function index()

    {

        $mailData = [

            'title' => 'SMP IT Hayatan Thayyibah',

            'url' => 'link',

            'namaUser' => 'guntur'

        ];

         

        Mail::to('guntur57319@gmail.com')->send(new DemoMail($mailData));

           

        dd("Email is sent successfully.");

    }

}