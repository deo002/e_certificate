import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(100, 'Must be at most 100 characters long')
        .required('This field cannot be empty'),
    email: yup
        .string()
        .trim()
        .email('Must be a valid email')
        .required('This field cannot be empty'),
    password: yup
        .string()
        .trim()
        .min(8, 'Must be at least 8 characters long')
        .max(100, 'Must be at most 100 characters long')
        .required('This field cannot be empty')
});

export default schema;