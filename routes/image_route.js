'use strict';                                   // Strictly follow latest JS standards

// Required Dependencies
var express = require('express');
var router = express.Router();
var sanitize = require('mongo-sanitize');       // To stop NoSQL injections - any req starts with $ will be emitted
var IMG = require('../models/image_model');     // Profile Model

var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var Scraper = require ('images-scraper');
var google = new Scraper.Google();
var Jimp = require("jimp");

router.route('/')
.get(function(req, res, next){                  // Give all keywords in ascending order
    
    IMG.aggregate([{$group : {_id : "$keyword", no_of_images_exists : {$sum : 1}}}])
    .exec(function(err, im){
        if(err)
            next(err);
        res.status(200).json(im);
    });
})

.post(function(req, res, next){                 // Store keyword with extra-ordinary conditions
    console.log(req.body);
    var keyword_Searched = sanitize(req.body.key);
        google.list({
            keyword: keyword_Searched,
            num: 15,
            detail: true,
            nightmare: {
                show: true
            }
        })
        .then(function (data) {
            
             for(var k = 0; k < data.length; k++){
                 Jimp.read(data[k].url).then(function (image) {
                     var t = Date.now();
                     var name = t + '.jpg';
                     
                     
                     IMG.create({keyword: keyword_Searched, image_name: name}, function(err, success){
                            if(err)    next(err);
                            image.quality(40).greyscale().write("./public/images/"+name);//compressing and adding black&white before saving
                            console.log("saved");
                        });
                 }).catch(function(err) {
                        console.log('err', err);
                        return res.status(500).send({success: false});
                 });
             }
            return res.status(200).send({success: true});
        })
        .catch(function(err) {
            console.log('err', err);
            return res.status(500).send({success: false});
        });

        // you can also watch on events 
        google.on('result', function (item) {
            console.log('out', item);
            return res.status(200).send({success: true});
        });
});

router.route('/image/:key')
.get(function(req, res, next){                  // Give all keywords in ascending order
    //console.log(req.params.key);
    
    IMG.find({keyword: sanitize(req.params.key)})
    .exec(function(err, im){
        if(err)
            next(err);
        
        var im_obj = [];
        //console.log(im.length);
        
        
            for(var p=0; p < im.length; p++){
                var content = fs.readFileSync("./public/images/"+im[p].image_name);

                //specify the content type in the response will be an image
                im_obj.push({con: content.toString("base64")});
                
            }
        
        res.json(im_obj);
    });
});

module.exports = router;