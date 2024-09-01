const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
// require("dotenv").config();

const { MONGODB_URL } = process.env;

exports.connect = () => {
	mongoose
		.connect(MONGODB_URL, {
			useNewUrlparser: true,
			useUnifiedTopology: true,
		})
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};

// exports.connect = () => {
// 	mongoose.connect(process.env.MONGODB_URL)
// 	.then(console.log(`DB Connection Success`))
// 		.catch((err) => {
// 			console.log(`DB Connection Failed`);
// 			console.log(err);
// 			process.exit(1);
// 		});
// }

