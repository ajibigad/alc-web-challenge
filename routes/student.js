var express = require('express');
var router = express.Router();

var AlcResponse = require('../helpers/alcResponse');

var Student = require('../models/student');

router.param("id", function(req, res, next) {
    if (req.params.id && !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(404).json(new AlcResponse("Student not found"));
        return;
    } else {
        next();
    }
})


router.route('/')
    .get(function(req, res) {

        var query = {};
        var options = {};

        var resultCallBack = function(err, students) {
            if (err) {
                res.send(err)
            } else if (!students) {
                res.status(404).json(new AlcResponse("Student not found", err));
            } else {
                res.json(new AlcResponse("Students fetched", students));
            }
        };

        // if (req.query.id) {
        //     query._id = new RegExp('^' + req.query.id, "i");
        // }

        if (req.query.all) {
            Student.find({}, resultCallBack);
            return;
        }

        if (req.query.page && req.query.limit && parseInt(req.query.limit) != NaN && parseInt(req.query.page) != NaN) {
            options.limit = parseInt(req.query.limit);
            options.page = parseInt(req.query.page);
        }

        Student.paginate(query, options, resultCallBack);
    });


router.route('/:id')

    .get(function(req, res) {

        Student.findById(req.params.id, function(err, student) {

            if (err) {
                res.status(500).json(new AlcResponse("Error occured while fetching student", err));
            } else if (!student) {
                res.status(404).json(new AlcResponse("Student not found"));
            } else {
                res.json(new AlcResponse("Student found", student));
            }
        });
    });


router.route('/')

    .post(function(req, res) {

        var student = new Student(req.body);
        var errorMessage = "Error occured while saving student";
        student.save(function(err) {
            if (err) {
                if (err.code == 11000 || err.name === "ValidationError") {
                    if(err.code == 11000){
                        errorMessage = "Email exist already";
                    }
                    res.status(400);
                } else {
                    res.status(500);
                }
                res.json(new AlcResponse(errorMessage, err));
            } else {
                res.json(new AlcResponse('Student created!', student));
            }
        });

    });


router.route('/')

    .put(function(req, res) {

        var student = new Student(req.body);
        Student.findByIdAndUpdate(student._id, student, { new: true }, function(err, student) {

            if (err) {
                if (err.code == 11000) {
                    res.status(400);
                } else {
                    res.status(500);
                }
                res.json(new AlcResponse("Error occured while updating student", err));
            } else if (!student) {
                res.status(404).json(new AlcResponse("Student not found"));
            } else {
                res.json(new AlcResponse('Student updated!', student));
            }
        });

    });


router.route('/:id')
    .delete(function(req, res) {

        Student.findByIdAndRemove(req.params.id, function(err, student) {

            if (err) {
                res.status(500).json(new AlcResponse("Error occured while deleteing ", err))
            } else {
                res.json(new AlcResponse('Student deleted'));
            }
        });
    });

module.exports = router;