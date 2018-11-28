const fetch = require('node-fetch');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const dbConfig = require('./db.config.js');
const mongoose = require('mongoose');
const async = require('async');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// const Grab = require('./grab.model.js');

const LogSchema = mongoose.Schema({
    

}, { strict: false });

var Kelurahan = mongoose.model('Kelurahan', LogSchema);

var Grab = mongoose.model('Grab', LogSchema);
var date = Math.floor(new Date() / 1000)
// var query = Grab.findOne();
// query.exec(function (err, data) {
//   if (err) return handleError(err);
//   //data = JSON.parse(data)
//   oke = data.toObject({getters: true})
//   console.log(oke.nama)
// })

function getOne(){
	query = Kelurahan.findOneAndUpdate({ ambil : null}, {ambil : 'sudah'});
	query.exec(function (err, data) {
	  if (err) console.log(err);
	  //data = JSON.parse(data)
	  //oke = data.toObject({getters: true})
	  console.log(oke);
	  for (var i = oke.jmlTps; i > 0; i--) {
	  	cariDpt(oke.namaPropinsi, oke.namaKabKota, oke.namaKecamatan, oke.namaKelurahan, i)
	  
	  }
	})
	//query.update({ ambil : 'sudah' })
}

function cariDpt(provinsi, kota, kecamatan, kelurahan, tps){
fetch('https://infopemilu.kpu.go.id/pilkada2018/pemilih/dpt/1/'+provinsi+'/'+kota+'/'+kecamatan+'/'+kelurahan+'/'+tps+'/listDps.json?_='+date, {
        method: 'get',
        headers: { Cookie: "_ga=GA1.3.1275283654.1542587633; _gid=GA1.3.2036981340.1542710926;", 'Content-Type': 'application/json' },
    })
    .then(resp => {
		let text = res.text();
		if (resp.status >= 200 && resp.status < 300) {
			loopDpt(provinsi, kota, kecamatan, kelurahan, text);
		  } else {
			return text.then(Promise.reject.bind(Promise));
		  }
	})
    //.then(body => loopDpt(provinsi, kota, kecamatan, kelurahan, body))
    .catch(err => {console.error(err);
    	return});
}

function loopDpt(provinsi, kota, kecamatan, kelurahan, data){
	if (IsJsonString(data) == false) {
    		
    	console.log('gagal dpt');
    	console.log(data);
    }
    else{
    	dpt = JSON.parse(data)
		// for (var n = dpt.aaData.length - 1; n >= 0; n--) {
	 //    	console.log('Data : '+JSON.parse(dpt.aaData[n]));
	 //    }
	 pemilih = dpt.aaData
	 async.forEach(pemilih, function(pemilih, callback){

	 pemilih['provinsi'] = provinsi
	pemilih['kota'] = kota
	pemilih['kecamatan'] = kecamatan
	pemilih['kelurahan'] = kelurahan
	pemilih['tanggalLahir'] = pemilih['nik'].substr(6,6);
		if (pemilih['jenisKelamin'] == 'P') {
		pemilih['tanggalLahir'] = pemilih['tanggalLahir'] - 400000;
		}
		Grab.create(pemilih, function(error){
    		console.log('Berhasil simpan Grab')
	 		console.log(pemilih)
    	})
	 })
    }
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


getOne()
