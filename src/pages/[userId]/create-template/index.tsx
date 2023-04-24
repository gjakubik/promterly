import React, { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography } from '@mui/material';
import Layout from '~/layout/Layout';
import { api } from '~/utils/api';

interface TemplateFormValues {
    title: string;
    prompt: string;
}

interface CreateTemplateProps {
    userId: string;
}

const initialValues: TemplateFormValues = {
    title: '',
    prompt: '',
};

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    prompt: Yup.string().required('Prompt is required'),
});

const CreateTemplate: React.FC<CreateTemplateProps> = ({ userId }) => {
    const [templateId, setTemplateId] = useState<string | undefined>(undefined);
    const upsertTemplateMutation = api.template.upsert.useMutation();

    const handleSubmit = async (values: TemplateFormValues) => {
        console.log(userId);
        try {
            const updatedTemplate = await upsertTemplateMutation.mutateAsync({
                id: templateId,
                userId,
                title: values.title,
                prompt: values.prompt,
            });

            if (!templateId) {
                setTemplateId(updatedTemplate.id);
            }

            console.log('Template updated: ', updatedTemplate);
        } catch (error) {
            console.error('Error updating template: ', error);
        }
    };

    return (
        <Layout>
            <Typography variant="h4">Create a new template</Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field
                            name="title"
                            as={TextField}
                            label="Title"
                            fullWidth
                            variant="standard"
                            margin="normal"
                            helperText={<ErrorMessage name="title" />}
                        />
                        <Field
                            name="prompt"
                            as={TextField}
                            label="Prompt"
                            multiline
                            rows={8}
                            fullWidth
                            margin="normal"
                            helperText={<ErrorMessage name="prompt" />}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            Save
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export function getServerSideProps(context: GetServerSidePropsContext) {
    const userId = context.params?.userId;

    if (typeof userId !== 'string') {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            userId,
        },
    };
}

export default CreateTemplate;
