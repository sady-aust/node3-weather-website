const request = require('request');

let geoCode = (location,callback)=>{
    const url =   "https://api.mapbox.com/geocoding/v5/mapbox.places/"+location+".json?access_token=pk.eyJ1IjoidG91ZmlxMTUiLCJhIjoiY2p2bDlzc2x6MTA0ejN6azNxajlsdWI0eiJ9.kakcsHwrNgPQIFAk5l9QFw";

    request({url,json: true},(error,{body})=>{
        if(error){
            callback("Unable to connect the network",undefined);
        } else if(body.features.length === 0){
            console.log("No Data Found");
            callback("No Data Found",undefined);
        } else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            });
        }
    });

};

module.exports = geoCode;
