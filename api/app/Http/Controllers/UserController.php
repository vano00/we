<?php

namespace App\Http\Controllers;

use App\user;
use Illuminate\Http\Request;
use Illuminate\Hashing\BcryptHasher;

class UserController extends Controller
{

    public function showAllUsers()
    {
        return response()->json(User::all());
    }

    public function showOneUser($id)
    {
        return response()->json(User::find($id));
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|alpha_num',
            'email'    => 'required|email|max:50',
            'password' => 'required|min:8',
        ]);

        $user = $request->all();
        $user['password'] = (new BcryptHasher)->make($request->password);

        $user = User::create($user);

        return response()->json($user, 201);
    }
}
