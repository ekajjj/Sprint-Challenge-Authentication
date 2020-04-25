/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
	const sessions = {};
	const authError = {
		message: "Invalid credentials"
	};

		if (!req.session || !req.session.user) {
			return res.status(401).json(authError);
		}

};