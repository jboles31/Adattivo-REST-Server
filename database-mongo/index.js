var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var employeesSchema = mongoose.Schema({
  ID: Number,
  FirstName: String,
  MiddleInitial: String,
  LastName: String,
  DateOfBirth: String,
  DateOfEmployment: String,
  Status: String,
})

const Employees = mongoose.model('information', employeesSchema)

var selectAll = (callback) => {
  Employees.find({Status: 'Active'}).exec((err, info) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, info);
    }
  });
};

var selectByID = (param, callback) => {

  Employees.find({ID: param}).exec((err, info) => {
    if(err) {
      callback(err, null);
    } else if (info[0].Status === 'Active'){
      callback(null, info);
    }
  })
}

var update = (params, callback) => {

  Employees.findOneAndUpdate(filter, update, {new: true} ).exec((err, info) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, info)
    }
  })
}

var setInactive = (filter, callback) => {

  Employees.findOneAndUpdate({ID: filter}, {Status: 'Inactive'}, {new: true}).exec((err, info) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, info)
    }
  })
}

// var insertEntry = (entry, callback) => {

//   Employees.create({ID: entry.ID, FirstName: entry.FirstName, MIddleInitial: entry.MiddleInitial, LastName: entry.LastName, DateOfBirth: entry.DateOfBirth, DateOfEmployment: entry.DateOfEmployment, Status: entry.Status}, (err) => {
//     if (err) {
//       callback('err') 
//     } else {
//       console.log('saved to db')
//       callback();
//     }
//   })
// }

// var updateEntry = (entry, callback) => {

//   Employees.update({}, (err) => {
//     if ()
//   })
// }

// var checkEntry = (entry, callback) => {

//   Employees.find({ID: entry}, (err, info) => {
//       if (info.length === 0) {
//         callback('err', null)
//       } else {
//         console.log('info in DB', info);
//         callback(null, info)
//     }
//   })
// }

module.exports = {
  selectAll,
  selectByID,
  update,
  setInactive,
  // checkEntry,
  // insertEntry,
};
