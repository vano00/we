<?php

namespace App\Http\Controllers;

use App\Webcam;
use Illuminate\Http\Request;

class WebcamController extends Controller
{

    public function showAllWebcams()
    {
        return response()->json(Webcam::all());
    }

    public function showOneWebcam($id)
    {
        return response()->json(Webcam::find($id));
    }

    public function create(Request $request)
    {

        $this->validate($request, [
            'name' => 'required',
            'location' => 'required',
            'url' => 'required|url',
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
        ]);

        $webcam = Webcam::create($request->all());

        return response()->json($webcam, 201);
    }

    public function update($id, Request $request)
    {

        $this->validate($request, [
            'name' => 'required',
            'location' => 'required',
            'url' => 'required|url',
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
        ]);

        $webcam = Webcam::findOrFail($id);
        $webcam->update($request->all());

        return response()->json($webcam, 200);
    }

    public function delete($id)
    {
        Webcam::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
