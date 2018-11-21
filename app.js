
const dbConfig = require('./db.config.js');
const request = require('request');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const async = require('async');
const delay = require('delay');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

console.log("run node");

const Grab = require('./grab.model.js');

//const controller = require('./grab.controller.js');

var date = Math.floor(new Date() / 1000);
//var current_hour = date.getHours();
console.log(date);

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

//var url = 'https://infopemilu.kpu.go.id/pilkada2018/pemilih/dpt/1/listNasional.json?_='+date;
//console.log(url);
request.get({
	url: 'https://infopemilu.kpu.go.id/pilkada2018/pemilih/dpt/1/JAWA TENGAH/KOTA SURAKARTA/listDps.json?_='+date,
	headers:{
         Cookie: "_ga=GA1.3.1275283654.1542587633; _gid=GA1.3.2036981340.1542710926;"
     } 
},function(error, response, body){
	if(!error){
		//var aaData = "aaData";
		 var data = JSON.parse(body);
		 dataKota = data.aaData;
		 async.eachSeries(dataKota, function(dataKota, callback){
		 	setTimeout(function(){
			dataKecamatan = dataKota.namaKecamatan;
			url1 = 'https://infopemilu.kpu.go.id/pilkada2018/pemilih/dpt/1/JAWA TENGAH/KOTA SURAKARTA/'+dataKecamatan+'/listDps.json?_='+date;
				//console.log(url1);
			request.get({
			url: url1,
			headers:{ Cookie: "_ga=GA1.3.1275283654.1542587633; _gid=GA1.3.2036981340.1542710926;"
			}
		}, function(error1, response1, body1){
			if (!error1 && IsJsonString(body1) == true) {
				
				 var data1 = JSON.parse(body1);
				 //console.log(data1);
				 data1 = data1.aaData;
				async.eachSeries(data1, function(data1, callback){
					setTimeout(function(){
					dataKelurahan = data1.namaKelurahan;
					request.get({
					url: 'https://infopemilu.kpu.go.id/pilkada2018/pemilih/dpt/1/JAWA TENGAH/KOTA SURAKARTA/'+dataKecamatan+'/'+dataKelurahan+'/listDps.json?_='+date,
					headers:{ Cookie: "_ga=GA1.3.1275283654.1542587633; _gid=GA1.3.2036981340.1542710926;"
					}}, function(error2, response2, body2){
						//console.log(body2);
						//callback();
						if (!error2 && IsJsonString(body2) == true) {
						var data2 = JSON.parse(body2);
						data2 = data2.aaData;
							async.eachSeries(data2, function(data2, callback){
								setTimeout(function(){
								if (data2.tps) {
								dataTps = data2.tps;
								request.get({
								url: 'https://infopemilu.kpu.go.id/pilkada2018/pemilih/dpt/1/JAWA TENGAH/KOTA SURAKARTA/'+dataKecamatan+'/'+dataKelurahan+'/'+dataTps+'/listDps.json?_='+date,
								headers:{ Cookie: "_ga=GA1.3.1275283654.1542587633; _gid=GA1.3.2036981340.1542710926;"}
								},function(error3, response3, body3){
									if (!error2 && IsJsonString(body3) == true) {
										var data3 = JSON.parse(body3);
										data3 = data3.aaData;
										async.forEach(data3, function(data3, callback){
											data3['kelurahan'] = dataKelurahan;

											data3['kecamatan'] = dataKecamatan;

											data3['tanggalLahir'] = data3['nik'].substr(6,6);

											if (data3['jenisKelamin'] == 'P') {
												data3['tanggalLahir'] = data3['tanggalLahir'] - 400000;
											}
											Grab.create(data3, function(error4){
												console.log('Berhasil simpan!');
											});
											console.log(data3);

											callback();
										});
									}
									//console.log(body3);
									callback();
								});
								}
								}, 2000);
							});
							callback();
						} 
						else {
						        console.log('error:', 'tps');
						        callback();
						      } 
					});
				}, 20000);
				});

				 callback();
			}
				else {
				        console.log('error:', 'kelurahan');
				        callback()
				      } 
			});
		}, 1000);
		});
		 console.log('selesai');
	}
	else {
        console.log('error:', 'kecamatan');
      }  
});