export const env = {
	port: process.env.PORT || 2024,
	nodeEnv: process.env.NODE_ENV || "development",
	mongodbUri: process.env.DB_URI || "mongodb://127.0.0.1:27017/IPTV_Backend",
	jwtSecret: process.env.JWT_SECRET || "my_temporary_secret",
};
