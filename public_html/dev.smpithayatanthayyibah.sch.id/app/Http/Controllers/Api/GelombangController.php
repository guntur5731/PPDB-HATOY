<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;
use App\Services\GelombangServices;

class GelombangController extends Controller
{
    protected $GelombangServices;

    public function __construct(GelombangServices $GelombangServices)
    {
      $this->GelombangServices = $GelombangServices;
    }
    
    public function index () 
    {
        return $this->GelombangServices->index();
    }

    public function add (Request $request) 
    {
        return $this->GelombangServices->add($request);
    }

    public function delete (Request $request) 
    {
        return $this->GelombangServices->delete($request);
    }

    public function update (Request $request) 
    {
        return $this->GelombangServices->update($request);
    }

    public function listByGelombang (Request $request) 
    {
        return $this->GelombangServices->listByGelombang($request);
    }
}