import Joi from "joi";

export const seriesValidationSchema = {
    id: {
        params: Joi.object().keys({
            id: Joi.string().required(),
        }),
    },
    create: {
        body: Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string().optional(),
            trailer_id: Joi.string().required(),
            thumbnail_id: Joi.string().required(),
            genre_ids: Joi.array().items(Joi.string()).required(),
        }),
    },
    update: {
        params: Joi.object().keys({
            id: Joi.string().required(),
        }),

        body: Joi.object().keys({
            name: Joi.string(),
            description: Joi.string(),
            trailer_id: Joi.string(),
            thumbnail_id: Joi.string(),
            genre_ids: Joi.array().items(Joi.string()).required(),
        }),
    },
};
