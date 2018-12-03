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


var Grab = mongoose.model('Grab', LogSchema);
var date = Math.floor(new Date() / 1000)

function getOne(){
   joss =  Grab.findOne({ nikFull : null});
   joss.exec(function(err, data){
    if (err) console.log(err);
    oke = data.toObject({getters: true})
        update = Grab.updateOne({nik : oke.nik, nama : oke.nama},{$set:{nikFull : 'sudah'}})
        update.exec(function(error, data1){
            console.log('Berhasil simpan '+oke.nama)
        })
   })
    // Grab.findOne({ nikFull : null}, function(err, data){
    // if (err) console.log(err);
	//   oke = data.toObject({getters: true})
    //   console.log(oke);
    //   nik = oke.nik.substr(0,12);
    //   id = oke._id
    //   console.log(id)
	//    for (var i = 1; i < 20; i++) {
    //     ending = pad(i, 4, 0);
    //     nikKum = nik+ending
    //     console.log(nikKum)
    //      if (nikKum == nik+0003) {
    //         data.nikKum = nikKum
    //         data.save(function(err) {
    //             if (err) throw err;
    //             Grab.update({nik : nik, nama : oke.nama},{$set :{nikNew : nikKum }})
    //             console.log('Author updated successfully');
    //             return
    //         });
    //      }
	//    }
	// })
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  setInterval(() => {
getOne()
  }, 1000)