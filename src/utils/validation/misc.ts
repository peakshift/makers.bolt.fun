import * as yup from "yup";

export const imageSchema = yup.object().shape({
    id: yup.string().nullable(true),
    name: yup.string().nullable(true),
    url: yup.string().trim().required().url(),
});

export const tagSchema = yup.object().shape({
    title: yup.string().trim().min(2).required(),
});

