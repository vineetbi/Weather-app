const request= require('request');

const forecast=(latitude, longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=9b6f70c7db50e12f59535248c6a8b2d1&query='+ latitude + ',' + longitude + '&units=m'
    request({url, json: true}, (error, {body}={})=>{
        if(error)   callback('Unable to connect to weather service!',undefined);
        else if(body.error)    callback('unable to find location',undefined);
        else{
            callback(undefined,
                body.current.weather_descriptions[0] + '. The current temperature is ' + body.current.temperature +' degrees, it feels like '+body.current.feelslike +' degrees. Humidity is ' + body.current.humidity+' percent. There is '+body.current.precip*100 +' percent chance of rain'
                )
            
        }
    })
}

module.exports= forecast;