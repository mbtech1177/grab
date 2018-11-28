const Log = require('grab.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request

    // Create a Note
    const log = new Log({ req.body
    });

    // Save Note in the database
    log.save()
    .then(data => {
        res.send(data);
        console.log('Simpan data!');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

exports.createPropinsi = (req, res) => {
    // Validate request

    // Create a Note
    const propinsi = new Log.propinsi({ req.body
    });

    // Save Note in the database
    propinsi.save()
    .then(data => {
        res.send(data);
        console.log('Simpan data!');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
// exports.findAll = (req, res) => {
//     Log.find().sort({createdAt: 'desc'})
//     .then(logs => {
//         res.send(logs);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving notes."
//         });
//     });
// };
