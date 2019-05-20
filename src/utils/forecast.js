const request = require('request');

let forecast = (lat,long,callback)=>{
    const url = 'https://api.darksky.net/forecast/39e7b14adb0ab3e1f9a19af1a83fbd84/'+lat+','+long;

    request({url,json:true},(error,{body})=>{
     if(error){
         callback("Unable to connect the network",undefined);
     }
     else if(body.error){
         callback("Unable to find location",undefined);
     }
     else if(body){
         callback(undefined,"There is a "+body.currently.precipProbability+"% Chance of rain. And temperature "+body.currently.temperature);
     }

    });
};
module.exports = forecast;
