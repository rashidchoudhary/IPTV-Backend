import Joi from "joi";

export const seasonValidationSchema = {
    id: {
        params: Joi.object().keys({
            id: Joi.string().required(),
        }),
    },
    create: {
        body: Joi.object().keys({
            series_id: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().optional(),
        }),
    },
    update: {
        params: Joi.object().keys({
            id: Joi.string().required(),
        }),

        body: Joi.object().keys({
            series_id: Joi.string(),
            name: Joi.string(),
            description: Joi.string(),
        }),
    },
};
