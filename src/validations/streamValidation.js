import Joi from "joi";

export const streamValidationSchema = {
    id: {
        params: Joi.object().keys({
            id: Joi.string().required(),
        }),
    },
    create: {
        body: Joi.object().keys({
            episode_id: Joi.string().required(),
            user_id: Joi.string().required(),
            time: Joi.string().required()
        }),
    },
    update: {
        params: Joi.object().keys({
            id: Joi.string().required(),
        }),

        body: Joi.object().keys({
            episode_id: Joi.string(),
            user_id: Joi.string(),
            time: Joi.string(),
        }),
    },
};
