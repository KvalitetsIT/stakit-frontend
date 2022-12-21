import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';





export const ValidationSchemaExample = () => {
    const { t, i18n } = useTranslation();

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, t('Too Short!'))
            .max(50, t('Too Long!'))
            .required(t('Required')),
        lastName: Yup.string()
            .min(2, t('Too Short!'))
            .max(50, t('Too Long!'))
            .required(t('Required')),
        email: Yup.string().email(t('Invalid email')).required(t('Required')),
    });

    
    return (
        <div>
            <h1>{t("Signup")}</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="firstName" />
                        {errors.firstName && touched.firstName ? (
                            <div>{errors.firstName}</div>
                        ) : null}
                        <Field name="lastName" />
                        {errors.lastName && touched.lastName ? (
                            <div>{errors.lastName}</div>
                        ) : null}
                        <Field name="email" type="email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                        <button type="submit">{t("Submit")}</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};