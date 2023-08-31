<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;
use App\Services\LandingServices;

class LandingController extends Controller
{
    protected $LandingServices;

    public function __construct(LandingServices $LandingServices)
    {
      $this->LandingServices = $LandingServices;
    }

    public function index () 
    {
        return $this->LandingServices->index();
    }

    public function imageLanding (Request $request) 
    {
        return $this->LandingServices->imageLanding($request);
    }

    public function imageLandingList (Request $request)
    {
        return $this->LandingServices->imageLandingList($request);
    }

    public function imageLandingDelete (Request $request)
    {
        return $this->LandingServices->imageLandingDelete($request);
    }

    public function imageLandingUpdate (Request $request)
    {
        return $this->LandingServices->imageLandingUpdate($request);
    }
}