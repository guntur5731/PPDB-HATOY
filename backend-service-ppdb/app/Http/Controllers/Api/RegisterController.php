<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Gelombang;
use Illuminate\Support\Facades\Auth;
use Validator;
use DB;
use File;
use App\Utils\Response;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller as Controller;
use Ramsey\Uuid\Uuid;
class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $response = new Response;
        $inputs = $request->all();

        $gelombang = Gelombang::select('gelombang', 'tahun_ajaran', 'id_gelombang')->where('posting','=',1)->first();
        if($gelombang){
            $users = DB::table('users')->where('email', $inputs['email'])->first();
            if($users){
                $response->setData("Email Sudah Terdaftar");
                $response->setStatus(true);
                $response->setCode(200);
                $response->setMessage("Email Sudah Terdaftar");
            }else{
                $folderPath = "images/";
                if(!File::isDirectory($folderPath)){
                    File::makeDirectory($folderPath, 0777, true, true);
                }

                $converted = $gelombang->gelombang;
                $converted2 = Str::substr($gelombang->tahun_ajaran,2);

                $tahun =  $converted2;
                $q = DB::table('users')->select(DB::raw('MAX(RIGHT(id_registrasi,3)) as nomor'))->where('id_registrasi', 'LIKE', 'REG-'.$tahun.($tahun+1).".0".$converted . '%');
                
                $nomor = "";
                if ($q->count() > 0) {
                    foreach ($q->get() as $k) {
                        $tmp = ((int) $k->nomor) + 1;
                        $nomor = 'REG-'.$tahun.($tahun+1).".0".$converted.".".sprintf("%03s", $tmp);
                    }
                } else {
                    $nomor = 'REG-'.$tahun.($tahun+1).".0".$converted.".001";
                }

                $image_parts = explode(";base64,", $inputs['file']);
                $image_type_aux = explode("image/", $image_parts[0]);
                $image_type = $image_type_aux[1];
                $image_base64 = base64_decode($image_parts[1]);
                $file = $folderPath . uniqid() .$inputs['formatFile'];
                file_put_contents($file, $image_base64);

                $input['name'] = $inputs['namaPeserta'];
                $input['nisn'] = $inputs['nisn'];
                $input['password'] = bcrypt($inputs['password']);
                $input['photo'] = $file;
                $input['email'] = $inputs['email'];
                $input['created_at'] = date('Y-m-d H:i:s');
                $input['id_registrasi'] = $nomor;
                $input['userUuid'] = Uuid::uuid4()->getHex();
                $input['is_verifikasi'] = 0;
                $input['gelombang'] = $gelombang->gelombang;
                $input['gelombang_id'] = $gelombang->id_gelombang;
                $input['telp'] = $inputs['noTlp'];
                $user = DB::table('users')->insert($input);

                $bio['userUuid'] = $input['userUuid'];
                $bio['no_hp'] = $inputs['noTlp'];
                $user = DB::table('biodata')->insert($bio);

                $response->setStatus(true);
                $response->setCode(200);
                $response->setMessage("Pendaftaran berhasil dilakukan");
            }
        }else{
            $response->setData("Pendaftaran Peserta Didik Baru Sudah Di tutup");
            $response->setStatus(true);
            $response->setCode(200);
            $response->setMessage("Pendaftaran Peserta Didik Baru Sudah Di tutup");
        }
        
        return $response->sendResponse();
    }
    public function login(Request $request)
    {
        $response = new Response;
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
            $user = Auth::user();
            $users = User::where('email', $request->email)
                        ->select('users.name', 'users.email', 'users.photo', 'users.nisn', 'users.id_registrasi', 'role.name as roleName', 'users.userUuid')
                        ->leftjoin('role', 'role.role_id', '=', 'users.role_id')
                        ->first();
            $insertToken = DB::table('personal_access_tokens')->where('tokenable_id', $user->id)->delete();
            $success['token'] =  $user->createToken('token-auth')->plainTextToken;
            $success['user'] =  $users;

            $response->setData($success);
            $response->setStatus(true);
            $response->setCode(200);
            $response->setMessage("Succes loggin");
        }
        else{ 
            $response->setStatus(false);
            $response->setCode(500);
            $response->setMessage("Failed loggin");
        } 
        return $response->sendResponse();
    }

    public function gelombang()
    {
        $response = new Response;
        $response->setData(Gelombang::select('gelombang', 'tahun_ajaran')->where('posting','=',1)->first());
        $response->setStatus(true);
        $response->setCode(200);
        $response->setMessage("Sukses mengambil data");
        return $response->sendResponse();
    }

}