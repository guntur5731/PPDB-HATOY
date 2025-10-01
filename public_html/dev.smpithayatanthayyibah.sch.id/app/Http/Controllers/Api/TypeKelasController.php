<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;
use App\Services\TypeKelasServices;

class TypeKelasController extends Controller
{
    protected $TypeKelasRepository;

    public function __construct(TypeKelasServices $TypeKelasServices)
    {
      $this->TypeKelasServices = $TypeKelasServices;
    }

    public function index () 
    {
        return $this->TypeKelasServices->index();
    }

    public function add (Request $request) 
    {
        return $this->TypeKelasServices->add($request);
    }

    public function update (Request $request) 
    {
        return $this->TypeKelasServices->update($request);
    }
}