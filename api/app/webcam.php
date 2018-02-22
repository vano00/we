<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Webcam extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'location', 'url', 'latitude', 'longitude', 'latest_article_published'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}
