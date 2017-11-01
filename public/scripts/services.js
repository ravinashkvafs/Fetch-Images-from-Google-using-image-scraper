'use strict';

angular.module('drwn')
.constant("baseURL", "http://localhost:3000/")

.factory('imgFac', ['baseURL', '$resource', function(baseURL, $resource){
    var content = {};
    var notiD = {};
    
    notiD.send = function(data){
        content = $resource(baseURL + 'image_route').save({key: data});
        return content;
    };
    notiD.getList = function(){
        content = $resource(baseURL + 'image_route', null, {'get': {method: 'GET', isArray: true}}).get();
        return content;
    };
    notiD.getIMG = function(para){
        content = $resource(baseURL + 'image_route/image/:key').get(para);
        return content;
    };
    
    return notiD;
}])
;