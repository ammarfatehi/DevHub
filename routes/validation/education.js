//  to make sure when users are logging in the are inputing validate inputs like password must contain so and so
const isEmpty = require('./is-empty');
const Validator = require('validator');

module.exports = function validateEducationInput(data) {
    let errors = {};
     
    data.school = !isEmpty(data.school) ? data.school : '';    // if statement ? true case : false case
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';


    if(Validator.isEmpty(data.school)) {
        errors.school = 'School field is required';
    }
    
    if(Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required';
    }
    
    if(Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
    }

    if(Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Field of study field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};