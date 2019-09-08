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

      console.log('soiltype: ', soiltype_re);
      console.log('soilph: ', soilph_re);
    });
  });
  });