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
//var ObjectId = require('mongoose').Types.ObjectId; 
const LogSchema = mongoose.Schema({

}, { strict: false });


LogSchema.pre("save", function(next) {
    if(!this.trial){
        //do your job here
    }
    next();
})


var Grab = mongoose.model('Grab', LogSchema);
var date = Math.floor(new Date() / 1000)

function getOne(){
Grab.findOne({ nikFull : null}, function(err, docs){
    if (err) console.log(err);
    oke = docs.toObject({getters: true})
    nik = oke.nik.substr(0,12);
    id = oke._id
    console.log(id)
	for (var i = 1; i < 20; i++) {
        ending = pad(i, 4, 0);
        nikKum = nik+ending
        cariNik(nikKum, function(resonse){
              data = JSON.parse(resonse)
              //console.log(data[0].aaData)
             isiData = data[0].aaData
             nikAsli = data[1]
            // console.log(data[0].nama)
             if(isiData.length > 0){
                if(isiData[0].nama == oke.nama){
                    docs._doc.nikFull = nikAsli.toString()
                    docs.markModified("nikFull")
                    docs.save(function(error){
                        if (error) console.log(error)
                    })
                    console.log('Simpan '+nikAsli)
                }
              }
            
        })
       
    }
    docs._doc.nikFull = oke.nik
    docs.markModified("nikFull")
    docs.save(function(error){
        if (error) console.log(error)
    })
});

}

function cariNik(nik, callback){
    fetch('https://infopemilu.kpu.go.id/pilkada2018/pemilih/dpt/1/hasil-cari/resultDps.json?nik='+nik+'&nama=&namaPropinsi=&namaKabKota=&namaKecamatan=&namaKelurahan=&notificationType=&_='+date, {
            method: 'get',
            headers: { Cookie: "_ga=GA1.3.1275283654.1542587633; _gid=GA1.3.2036981340.1542710926;", 'Content-Type': 'application/json' },
        })
        .then(resp => resp.text())
        .then(text => callback("["+text+" , "+nik+"]"))
        .catch(err => {console.error(err);
            return});
    }

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  setInterval(() => {
getOne()
  }, 400)