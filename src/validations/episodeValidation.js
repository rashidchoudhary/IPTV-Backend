import Joi from "joi";

export const episodeValidationSchema = {
    id: {
		params: Joi.object().keys({
			id: Joi.string().required(),
		}),
	},
	create: {
		body: Joi.object().keys({
            season_id: Joi.string().required(),
			name: Joi.string().required(),
            description: Joi.string().required(),
            thumbnail_id: Joi.string().required(),
		}),
	},
    update: {
		params: Joi.object().keys({
			id: Joi.string().required(),
		}),

		body: Joi.object().keys({
			season_id: Joi.string(),
			name: Joi.string(),
            description: Joi.string(),
            thumbnail_id: Joi.string(),
		}),
	},
};
