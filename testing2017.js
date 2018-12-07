const fetch = require('node-fetch');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const dbConfig = require('./db.config.js');
const mongoose = require('mongoose');
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

var Propinsi = mongoose.model('Propinsi', LogSchema);
var Kota = mongoose.model('Kota', LogSchema);
var Kelurahan = mongoose.model('Kelurahan', LogSchema);
var Kecamatan = mongoose.model('Kecamatan', LogSchema);

var Errors = mongoose.model('Errors', LogSchema);


function cariProvinsi(){
fetch('https://pilkada2017.kpu.go.id/pemilih/dpt/1/listNasional.json?_='+date, {
        method: 'get',
        headers: { Cookie: "_ga=GA1.3.1275283654.1542587633; _gid=GA1.3.2036981340.1542710926;", 'Content-Type': 'application/json' },
    })
    .then(res => res.text())
    .then(body => loopProvinsi(body))
    //.then(json => loopProvinsi(json.aaData))
    .catch(err => console.error(err));
}

function cariKota(provinsi){
fetch('https://pilkada2017.kpu.go.id/pemilih/dpt/1/'+provinsi+'/listDps.json?_='+date, {
        method: 'get',
        headers: { Cookie: "_ga=GA1.3.1275283654.1542587633; _gid=GA1.3.2036981340.1542710926;", 'Content-Type': 'application/json' },
    })
    .then(res => res.text())
    .then(body => loopKota(body))
    .catch(err => {console.error(err);
    	j--;
    	return});
}

function cariKecamatan(provinsi, kota){
fetch('https://pilkada2017.kpu.go.id/pemilih/dpt/1/'+provinsi+'/'+kota+'/listDps.json?_='+date, {
        method: 'get',
        headers: { Cookie: "_ga=GA1.3.1275283654.1542587633; _gid=GA1.3.2036981340.1542710926;", 'Content-Type': 'application/json' },
    })
    .then(res => res.text())
    .then(body => loopKecamatan(body))
    .catch(err => {console.error(err);
    	k--;
    	return});
}

function cariKelurahan(provinsi, kota, kecamatan){
fetch('https://pilkada2017.kpu.go.id/pemilih/dpt/1/'+provinsi+'/'+kota+'/'+kecamatan+'/listDps.json?_='+date, {
        method: 'get',
        headers: { Cookie: "_ga=GA1.3.1275283654.1542587633; _gid=GA1.3.2036981340.1542710926;", 'Content-Type': 'application/json' },
    })
    .then(res => res.text())
    .then(body => loopKelurahan(body))
    .catch(err => {console.error(err);
    	l--;
    	return});
}

function cariTps(provinsi, kota, kecamatan, kelurahan){
fetch('https://pilkada2017.kpu.go.id/pemilih/dpt/1/'+provinsi+'/'+kota+'/'+kecamatan+'/'+kelurahan+'/listDps.json?_='+date, {
        method: 'get',
        headers: { Cookie: "_ga=GA1.3.1275283654.1542587633; _gid=GA1.3.2036981340.1542710926;", 'Content-Type': 'application/json' },
    })
    .then(res => loopDpt(res))
    //.then(json => loopTps(json.aaData))
    .catch(err => {console.error(err);
    	m--;
    	return});
}

function cariDpt(provinsi, kota, kecamatan, kelurahan, tps){
fetch('https://pilkada2017.kpu.go.id/pemilih/dpt/1/'+provinsi+'/'+kota+'/'+kecamatan+'/'+kelurahan+'/'+tps+'/listDps.json?_='+date, {
        method: 'get',
        headers: { Cookie: "_ga=GA1.3.1275283654.1542587633; _gid=GA1.3.2036981340.1542710926;", 'Content-Type': 'application/json' },
    })
    .then(res => res.text())
    .then(body => loopDpt(body))
    .catch(err => {console.error(err);
    	n--;
    	return});
}

// const getPost = () => fetch('https://jsonplaceholder.typicode.com/posts/1')
// const getAuthor = (id) => fetch('https://jsonplaceholder.typicode.com/users/' + id)
// const getComment = (id) => fetch('https://jsonplaceholder.typicode.com/users/' + id)

// var a = getPost().then(res => res.json()) // #1 get post
// var b = a.then(res => getAuthor(res.id)).then(res => res.json()) // #2 get author
// var c = a.then(res => getComment(res.id)).then(res => res.json()) //#3 get comment
// Promise.all([a,b,c]).then(results => {
//   console.log(results[0])
//   console.log(results[1])
//   console.log(results[2])
// })

 var date = Math.floor(new Date() / 1000)

// const getProvinsi = () => fetch('https://pilkada2017.kpu.go.idpemilih/dpt/1/listNasional.json?_='+date);
// // const getKabupaten = (provinsi) => fetch('https://pilkada2017.kpu.go.idpemilih/dpt/1/'+provinsi+'/listDps.json?_='+date);
// // const getKecamatan = (provinsi, kabupaten) => fetch('https://pilkada2017.kpu.go.idpemilih/dpt/1/'+provinsi+'/'+kabupaten+'/listDps.json?_='+date);
// // const getKelurahan = (provinsi, kabupaten, kecamatan) => fetch('https://pilkada2017.kpu.go.idpemilih/dpt/1/'+provinsi+'/'+kabupaten+'/'+kecamatan+'/listDps.json?_='+date);
// // const getTps = (provinsi, kabupaten, kecamatan, kelurahan) => fetch('https://pilkada2017.kpu.go.id/pemilih/dpt/1/'+provinsi+'/'+kabupaten+'/'+kecamatan+'/'+kelurahan+'/listDps.json?_='+date);
// // const getDpt = (provinsi, kabupaten, kecamatan, kelurahan, tps) => fetch('https://pilkada2017.kpu.go.id/pemilih/dpt/1/'+provinsi+'/'+kabupaten+'/'+kecamatan+'/'+kelurahan+'/'+tps+'/listDps.json?_='+date);
// var a = getProvinsi.then(res => res.json());

// a.then(provinsiResponse => {
// 	console.log(provinsiResponse)
// })

//Promise(a).then(results => { console.log(results)});

function loopProvinsi(data){
	//for (var i = data.length - 1; i >= 0; i--) {
    	//console.log('Provinsi : '+data[i]['namaWilayah']);
    	//cariKota(data[i]['namaWilayah'])
    	if (IsJsonString(data) == false) {
    		console.log('gagal');
    	}
    	else{
    		provinsi = JSON.parse(data)
    		for (var i = provinsi.aaData.length - 1; i >= 0; i--) {
    			// Propinsi.create(provinsi.aaData[i], function(error){
    			// 	console.log('Berhasil simpan Propinsi')
    			// })
    			cariKota(provinsi.aaData[i]['namaWilayah']);
    		}
    	}
    	//console.log(data.status)
    //}
}

function loopKota(data){
	if (IsJsonString(data) == false) {
		console.log('gagal kota')
	}
	else{
		kota = JSON.parse(data)
	for (var j = kota.aaData.length - 1; j >= 0; j--) {
    	cariKecamatan(kota.aaData[j]['namaPropinsi'], kota.aaData[j]['namaKabKota'])
    			Kota.create(kota.aaData[j], function(error){
    				console.log('Berhasil simpan Kota')
    			})
    }
    }
}

function loopKecamatan(data){
			if (IsJsonString(data) == false) {
	    		console.log('gagal');
	    	}
	    	else{
	    		kecamatan = JSON.parse(data)
				for (var k = kecamatan.aaData.length - 1; k >= 0; k--) {
					if (kecamatan.aaData[k]['namaPropinsi']) {
					//setTimeout(function(){
						//console.log(kecamatan.aaData[k]['namaKecamatan'])

		    			Kecamatan.create(kecamatan.aaData[k], function(error){
		    				console.log('Berhasil simpan Kecamatan')
		    			})
			    	cariKelurahan(kecamatan.aaData[k]['namaPropinsi'], kecamatan.aaData[k]['namaKabKota'], kecamatan.aaData[k]['namaKecamatan'])

	    			//}, 2000);
	    			}
	    			else{
	    				console.log('gagal')
	    			}
		    	}
    		}
   //console.log(data)
}

function loopKelurahan(data){
    	//console.log('provinsi :'+provinsi+' kota : '+kota+'kecamatan : '+kecamatan+' Kelurahan : '+data[l]['namaKelurahan']);
    	//setTimeout(function(){
    if (IsJsonString(data) == false) {
    		
    		console.log(data);
    		Errors.create({error: data}, function(error){
    			console.log('simpan error')
    		})
    }
    else{
    		kelurahan = JSON.parse(data)
		for (var l = kelurahan.aaData.length - 1; l >= 0; l--) {

    			Kelurahan.create(kelurahan.aaData[l], function(error){
    				console.log('Berhasil simpan Kelurahan')
    			})
			//setTimeout(function(){
	// 			 for (var m = kelurahan.aaData[l]['jmlTps']; m > 0; l--) {
	// 			// 	setTimeout(function(){
	//      				cariDpt(kelurahan.aaData[l]['namaPropinsi'], kelurahan.aaData[l]['namaKabKota'], kelurahan.aaData[l]['namaKecamatan'], kelurahan.aaData[l]['namaKelurahan'], m)
	//    //  			}, 1000);
	//     		}
	   // 			console.log(kelurahan.aaData[l])
    		//}, 2000);
    	}
    // 	
    // 	cariTps(provinsi, kota, kecamatan, data[l]['namaKelurahan'])
    //}, 2000);
    }
}

function loopTps(data){
	for (var m = data.length - 1; m >= 0; m--) {
    	 //console.log('Tps : '+data[m]['tps']);
    	 if (IsJsonString(data) == false) {
    	 	console.log('Tps : '+data[m]['tps']);
    	 }
    	 else{
    	 	console.log(data);
    	 }
    	//cariDpt(data[m]['namaPropinsi'], data[m]['namaKabKota'], data[m]['namaKecamatan'], data[m]['namaKelurahan'], data[m]['tps'])
    }
}

function loopDpt(data){
	if (IsJsonString(data) == false) {
    		
    	console.log('gagal dpt');
    	console.log(data);
    }
    else{
    	dpt = JSON.parse(data)
		for (var n = dpt.aaData.length - 1; n >= 0; n--) {
	    	console.log('Data : '+dpt.aaData[n]);
	    }
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

cariProvinsi();
