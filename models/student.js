var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
var Schema       = mongoose.Schema;

mongoosePaginate.paginate.options = { 
  lean:  true,
  limit: 10
};

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var StudentSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    othername: { type: String, required: true },
    sex: { type: String, enum: ['male', 'female'], required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Invalid email address'],
    },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    birthDate: { type: Date, required: true }
});

StudentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Student', StudentSchema);