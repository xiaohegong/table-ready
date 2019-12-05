const mongoose = require('mongoose');

const url = 'mongodb://tordevtr2:A9wWScfasqRwNKotoB7VAdVXaZnZlFfK0xZ0BkRluOE3gcdvCXCiSQ3miGeqfDsFIlcv4T2onXVALohWxF9wnQ==@tordevtr2.documents.azure.com:10255/table_ready?ssl=true';

function connect() {
    mongoose.set('debug', true);
    mongoose.set('useFindAndModify', false);


    return mongoose
        .connect(url, {useNewUrlParser: true})
        .then(msg => {
            console.log(
                ' \n\n-----------------\nsuccessfully connected to Database\n-----------------\n\n'
            );
        })
        .catch(error => console.log(error));
}

module.exports = {
    connect,
    mongoose
};
