<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;
use App\Services\HomeServices;

class HomeController extends Controller
{
    protected $HomeServices;

    public function __construct(HomeServices $HomeServices)
    {
      $this->HomeServices = $HomeServices;
    }

    public function index () 
    {
        return $this->HomeServices->index();
    }

    public function biaya () 
    {
        return $this->HomeServices->biaya();
    }

    public function biayaUpdate (Request $request) 
    {
        return $this->HomeServices->biayaUpdate($request);
    }
}