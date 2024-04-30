export default {
	jwt: {
		// eslint-disable-next-line no-undef
		secret: process.env.AUTH_SECRET || "default", 
		expiresIn: "1d",
	}
}