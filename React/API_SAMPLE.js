const https = require('http');
//import React from 'react';
//import firebase from 'firebase/app';

var postcode = '3145';


function float2int (value) {
  return value | 0;
}

let url = 'http://www.asris.csiro.au/ASRISApi/api/APSIM/getClosestApsoil?longitude=147&latitude=-29.5&maxCnt=1'
https.get(url, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    var parseString = require('xml2js').parseString;

    parseString(data, function (err, result) {
      //var data = JSON.stringify(result);
      var info = result.ApsimSoils.Soil[0];
         soiltype_result = info['SoilType'][0];
         soilph_result = float2int(info['Analysis'][0]['PH'][0]['double'][0]);
      //console.log(soiltype_result); // Soil Type
      //console.log(soilph_result); // Soil PH

      let request = require('request');
      let apiKey = 'faaf0c59bc1b1ea440253d2b61ecde37';
      //let city = 'Melbourne';
      //let postcode = '3450'
      //let rul = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
      let rul = `http://api.openweathermap.org/data/2.5/weather?zip=${postcode},au&appid=${apiKey}`;
      request(rul, function (err, response, body) {
        if (err) {
          console.log('error:', error);
        } else {
          let weather = JSON.parse(body)
          let message = weather.weather[0].main; // get rain data
          //console.log(weather);

          // check rain info
          if (message.includes('Rain')){
            if ('rain' in weather){
              if ('3h' in weather.rain){
                var rain_info = weather.rain['3h'];
            }else{
              rain_info =0;
            };
          }else{
              rain_info = 0
          };
              //console.log(rain_info);
              //console.log(soiltype_result);
              //console.log(soilph_result);
          }else{
            rain_info = 0;
        };

        if ((soilph_result) > 8){
          soilph_re = 8;
        }else if ((soilph_result) < 5){
          soilph_re = 5;
        }else{
          soilph_re = soilph_result;
        };

        if (soiltype_result.toLowerCase().includes('sand') && soiltype_result.toLowerCase().includes('sandy') == false){
            soiltype_re = 'sa';
          }else if (soiltype_result.toLowerCase().includes('clay')){
            soiltype_re = 'cl';
        }else if (soiltype_result.toLowerCase().includes('lime')){
            soiltype_re = 'li';
        }else if (soiltype_result.toLowerCase().includes('loam')){
            soiltype_re = 'lo';
        };
        
        if (rain_info == 0){
          rains_info = 0
        }else if (rain_info > 2.5){
          rains_info = 2
        }else{
          rains_info = 1
        };
        
        //console.log(rains_info);
        //console.log(soiltype_re);
        //console.log(soilph_result);
        var firebase = require('firebase');
        const app = firebase.initializeApp({
        apiKey: "AIzaSyC61gmfLxxRwQVigtqphSdwDPCDBeRtS_g",
        authDomain: "plantsmartvictoria.firebaseapp.com",
        databaseURL: "https://plantsmartvictoria.firebaseio.com",
        projectId: "plantsmartvictoria",
        storageBucket: "plantsmartvictoria.appspot.com",
        messagingSenderId: "723453194803",
        appId: "1:723453194803:web:9bd33978fafce44d"
        });

        var pType = 'All';
        var counter=0;
        var passedList=[];
        firebase.database().ref('/').orderByChild('TypeAll').equalTo(pType).on('value', function (snapshot)
        {
         listofTrees =snapshot.val();
         //console.log(listofTrees);
         if (snapshot.numChildren()>0) {
           for(var k in listofTrees){
             var element = listofTrees[k];
             if(element['Soiltexture'].toLowerCase().includes(soiltype_re) && element['RainQuery'] == rains_info
             && element['PhQuery'].includes(soilph_re)){
                passedList.push(element)
                counter=counter+1
                if (counter>4) {
                  break;
                }
             }
           }
           if (counter>0) {
            console.log(passedList);
           }else {
             console.log('No Data found!, Please try other options');
           }
         }
       });}
      });
    });
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});