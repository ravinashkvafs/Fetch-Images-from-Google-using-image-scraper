var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var Scraper = require ('images-scraper')
  , google = new Scraper.Google();
var Jimp = require("jimp");

/*const download = require('image-downloader')

// Download to a directory and save with the original filename
var options = {
  url: '',
  dest: __dirname + '/images'                  // Save to /path/to/dest/image.jpg
}
*/


app.get('/scrape', function(req, res){
    
    google.list({
            keyword: 'rahul gandhi',
            num: 15,
            detail: true,
            nightmare: {
                show: true
            }
        })
        .then(function (data) {
             for(var k=0; k<data.length; k++){
                 /*options.url = data[k].url;
                 download.image(options)
                  .then(({ filename, image }) => {
                    console.log('File saved to', filename)
                  }).catch((err) => {
                    throw err
                  });*/
                 
                 Jimp.read(data[k].url).then(function (image) {
                     var t=Date.now();
                     image.quality(40).greyscale().write(__dirname+"/images/"+t+'.jpg');     //compressing and adding black&white before saving
                     
                 }).catch(function(err) {
                        console.log('err', err);
                        return res.status(500).send({success: false});
                 });
             }
            return res.status(200).send({success: true});
        }).catch(function(err) {
            console.log('err', err);
            return res.status(500).send({success: false});
        });

        // you can also watch on events 
        google.on('result', function (item) {
            console.log('out', item);
            return res.status(200).send({success: true});
        });
  });


app.listen('8081')
console.log('Magic happens on port 8081');
module.exports = app;
