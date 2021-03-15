//  to make sure when users are logging in the are inputing validate inputs like password must contain so and so
const isEmpty = require('./is-empty');
const Validator = require('validator');

module.exports = function validateLoginInput(data) {
    let errors = {};
     
    data.email = !isEmpty(data.email) ? data.email : '';    // if statement ? true case : false case
    data.password = !isEmpty(data.password) ? data.password : '';

    // email check
    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    // password
    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};