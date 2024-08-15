import Joi from "joi";

export const genreSeriesValidationSchema = {
    id: {
		params: Joi.object().keys({
			id: Joi.string().required(),
		}),
	},
  create: {
    body: Joi.object().keys({
      genre_id: Joi.string().required(),
      series_id: Joi.string().required(),
    }),
  },
  update: {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
      genre_id: Joi.string(), 
      series_id: Joi.string(), 
    }),
  },
};