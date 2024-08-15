import Joi from "joi";

export const genreValidationSchema = {
    id: {
		params: Joi.object().keys({
			id: Joi.string().required(),
		}),
	},
	create: {
		body: Joi.object().keys({
			name: Joi.string().required(),
		}),
	},
    update: {
		params: Joi.object().keys({
			id: Joi.string().required(),
		}),

		body: Joi.object().keys({
			name: Joi.string(),
		}),
	},
};
