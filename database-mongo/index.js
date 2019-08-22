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

const Employees = mongoose.model('employees', employeesSchema)

var selectAll = (callback) => {
  Employees.find({}).limit(1).exec((err, info) => {
    if(err) {
      callback(err, null);
    } else {
      console.log('all employees in db', info);
      callback(null, info);
    }
  });
};

var insertEntry = (entry, callback) => {

  Employees.create({ID: entry.ID, FirstName: entry.FirstName, MIddleInitial: entry.MiddleInitial, LastName: entry.LastName, DateOfBirth: entry.DateOfBirth, DateOfEmployment: entry.DateOfEmployment, Status: entry.Status}, (err) => {
    if (err) {
      callback('err') 
    } else {
      console.log('saved to db')
      callback();
    }
  })
}

// var updateEntry = (entry, callback) => {

//   Employees.update({}, (err) => {
//     if ()
//   })
// }

var checkEntry = (entry, callback) => {

  Employees.find({ID: entry}, (err, info) => {
      if (info.length === 0) {
        callback('err', null)
      } else {
        console.log('info in DB', info);
        callback(null, info)
    }
  })
}

module.exports = {
  selectAll,
  checkEntry,
  insertEntry,
};
