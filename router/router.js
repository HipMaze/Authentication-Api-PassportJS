const authRoutes = require("./authRoutes");

function Router(app) {
	app.use(`${process.env.BASE_API_URL}/auth`, authRoutes);
}

module.exports = Router;
