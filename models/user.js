var mongoose = require('mongoose');
//flag = 0-none, 1-red, 2-orange, 3-green, 4-blue, 5-black, 6-yellow

var mUser = mongoose.model('User', {
    name: String,
    email: String,
    pwd: String,
    isActive: Boolean
});

//type = 0-workday, 1-weekend, 2-weekday
var mRequest = mongoose.model('Request', {
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    time: String,
    type: String,
    title: String,
    search1: String,
    search2: String,
    search3: String,
    country: String,
    filter: String,
    isActive: Boolean

});

//test git

//gender = 0-male, 1-female
var mResponse = mongoose.model('Response', {
    request: {type: mongoose.Schema.ObjectId, ref: 'Request'},
    runDate: Date,
    resultCount: Number
});

var mResponseDetail = mongoose.model('ResponseDetail', {
    response: {type: mongoose.Schema.ObjectId, ref: 'Response'},
    title: String,
    isBuyNow: Boolean,
    price: String,
    bidsCount: String,
    endingTime: String,
    url: String,
    datePosted: String,
    returns: String,
    condition: String,
    pageNo: Number,
    rowNo: Number
});

module.exports = {
    User: mUser,
    Request: mRequest,
    Response: mResponse,
    mesponseDetail: mResponseDetail
};
