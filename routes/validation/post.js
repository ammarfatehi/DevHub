//  to make sure when users are logging in the are inputing validate inputs like password must contain so and so
const isEmpty = require('./is-empty');
const Validator = require('validator');
const { default: validator } = require('validator');

module.exports = function validatePostInput(data) {
    let errors = {};
     
    data.text = !isEmpty(data.text) ? data.text : '';    // if statement ? true case : false case

    if(!validator.isLength(data.text, {min: 10, max: 500})) {
        errors.text = 'Post must be between 10 and 500 characters';
    }

    // text check
    if(Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};