'use strict';
var dbConn = require('./../../config/db.config');

var Teacher = function (teacher) {
    this.first_name = teacher.first_name;
    this.last_name = teacher.last_name;
    this.registration_number = teacher.registration_number;
    this.grade = teacher.grade;
    this.created_at = new Date();
    this.updated_at = new Date();
}

Teacher.create = (newTeacher, result) => {
    dbConn.query("INSERT INTO teachers set ?", newTeacher, (err, res) => {
        if (err) {
            result(err, null)
            return;
        }
        result(null, 'incluído, id: ' + res.insertId)
    })
}

Teacher.findAll = (result) => {
    dbConn.query("Select * from teachers", (err, res) => {

        if (err) {
            result(null, err);
            return;
        }
        
        result(null, res);
    })
}


Teacher.delete = function (id, result) {
    dbConn.query("DELETE FROM teachers WHERE id = ?", [id], function (err, res) {
        if (err) {
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Teacher.update = (id, teacher, result) => {
    
    console.log(id)
    console.log(teacher)
    dbConn.query("UPDATE teachers SET first_name=?,last_name=?,registration_number=?,grade=? WHERE id = ?", [teacher.first_name, teacher.last_name, teacher.registration_number, teacher.grade, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = Teacher;