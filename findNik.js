const fetch = require('node-fetch');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const dbConfig = require('./db.config.js');
const mongoose = require('mongoose');
//const async = require('async');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
var ObjectId = require('mongoose').Types.ObjectId; 
const LogSchema = mongoose.Schema({
    

}, { strict: false });


var Grab = mongoose.model('Grab', LogSchema);
var date = Math.floor(new Date() / 1000)

function getOne(){
    Grab.findOne({ nikFull : null}, function(err, data){
    // query.exec(function (err, data) {
    if (err) console.log(err);
	  //data = JSON.parse(data)
	  oke = data.toObject({getters: true})
      console.log(oke.nik);
      nik = oke.nik.substr(0,12);
      id = oke._id
      console.log(id)
	   for (var i = 1; i < 20; i++) {
	//   //	cariDpt(oke.namaPropinsi, oke.namaKabKota, oke.namaKecamatan, oke.namaKelurahan, i)
        ending = pad(i, 4, 0);
        nikKum = nik+ending
        //console.log(nikKum)
        cariNik(oke.nama, nikKum)
        // if (nikKum == 3372024807540003) {
        //     //Grab.update({nik: nik, nama : oke.nama},{$set : {nikFull : nikKum}})
        //     // data.credentials.nikFull = nikKum
        //     // data.save()
        //     return
        // }
	   }
	})
	//query.update({ ambil : 'sudah' })
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  

function cariNik(nama, nik){
fetch('https://infopemilu.kpu.go.id/pilkada2018/pemilih/dpt/1/hasil-cari/resultDps.json?nik='+nik+'&nama=&namaPropinsi=&namaKabKota=&namaKecamatan=&namaKelurahan=&notificationType=&_='+date, {
        method: 'get',
        headers: { Cookie: "_ga=GA1.3.1275283654.1542587633; _gid=GA1.3.2036981340.1542710926;", 'Content-Type': 'application/json' },
    })
    .then(resp => resp.text())
    .then(text => findNama(nama, nik, text))
    .catch(err => {console.error(err);
    	return});
}

function findNama(nama, nik, text){
    data = JSON.parse(text)
    aaData = data.aaData
    if(aaData.length > 0){
    console.log(aaData[0])
    name = aaData[0].nama
    if(nama == name){
        nika = aaData[0].nik
        console.log(nik+' '+nika+' '+nama)
        Grab.findOneAndUpdate({nik : nika, nama: nama}, {nikFull : nik})
    }
    }
}

// function loopDpt(provinsi, kota, kecamatan, kelurahan, data){
// 	if (IsJsonString(data) == false) {
    		
//     	console.log('gagal dpt');
//     	console.log(data);
//     }
//     else{
//     	dpt = JSON.parse(data)
// 		// for (var n = dpt.aaData.length - 1; n >= 0; n--) {
// 	 //    	console.log('Data : '+JSON.parse(dpt.aaData[n]));
// 	 //    }
// 	 pemilih = dpt.aaData
// 	 async.forEach(pemilih, function(pemilih, callback){

// 	 pemilih['provinsi'] = provinsi
// 	pemilih['kota'] = kota
// 	pemilih['kecamatan'] = kecamatan
// 	pemilih['kelurahan'] = kelurahan
// 	pemilih['tanggalLahir'] = pemilih['nik'].substr(6,6);
// 		if (pemilih['jenisKelamin'] == 'P') {
// 		pemilih['tanggalLahir'] = pemilih['tanggalLahir'] - 400000;
// 		}
// 		Grab.create(pemilih, function(error){
//     		console.log('Berhasil simpan Grab')
// 	 	 	console.log(pemilih)
// 		})
// 		callback();
// 	 })
//     }
// }

// function IsJsonString(str) {
//     try {
//         JSON.parse(str);
//     } catch (e) {
//         return false;
//     }
//     return true;
// }

//setInterval(() => {
getOne()
//}, 1000);

