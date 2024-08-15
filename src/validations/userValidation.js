import Joi from "joi";

export const UserValidationSchema = {
	id: {
		params: Joi.object().keys({
			id: Joi.string().required(),
		}),
	},
	register: {
		body: Joi.object().keys({
			first_name: Joi.string().required(),
			last_name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().min(8).required(),
		}),
	},
	login: {
		body: Joi.object().keys({
		  email: Joi.string().email().required(),
		  password: Joi.string().min(8).required(),
		}),
	},
	update: {
		params: Joi.object().keys({
			id: Joi.string().required(),
		}),

		body: Joi.object().keys({
			first_name: Joi.string(),
			last_name: Joi.string(),
			email: Joi.string().email(),
			password: Joi.string().min(8),
		}),
	},
};
