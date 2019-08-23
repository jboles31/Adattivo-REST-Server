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
  Employees.find({Status: 'ACTIVE'}).exec((err, info) => {
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
    } else if (info[0].Status === 'ACTIVE'){
      callback(null, info);
    }
  })
}

var update = (params, callback) => {

  Employees.findOneAndUpdate({ID: params.ID}, {FirstName: params.FirstName, MiddleInitial: params.MiddleInitial, LastName: params.LastName, DateOfBirth: params.DateOfBirth, DateOfEmployment: params.DateOfEmployment}, {new: true} ).exec((err, info) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, info);
    }
  })
}

var setInactive = (filter, callback) => {

  Employees.findOneAndUpdate({ID: filter}, {Status: 'INACTIVE'}, {new: true}).exec((err, info) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, info)
    }
  })
}

var createEmp = (data, callback) => {

  Employees.create(data, (err, info) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, info);
    }
  })
}

module.exports = {
  selectAll,
  selectByID,
  update,
  setInactive,
  createEmp,
};
