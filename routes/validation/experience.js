//  to make sure when users are logging in the are inputing validate inputs like password must contain so and so
const isEmpty = require('./is-empty');
const Validator = require('validator');

module.exports = function validateExperienceInput(data) {
    let errors = {};
     
    data.title = !isEmpty(data.title) ? data.title : '';    // if statement ? true case : false case
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if(Validator.isEmpty(data.title)) {
        errors.title = 'Job title field is required';
    }
    
    if(Validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
    }
    
    if(Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};