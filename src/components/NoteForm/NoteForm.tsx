import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import { useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNotes } from "../../services/noteService";
import type { Tag } from "../../types/note";
import * as Yup from "yup";

interface InitialValuesFields {
  title: string;
  content: string;
  tag: Tag;
}

const initialValues: InitialValuesFields = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteFormProps {
  closeModal: () => void;
}
export default function NoteForm({ closeModal }: NoteFormProps) {
  const fieldId = useId();

  const queryClient = useQueryClient();

  const Schema = Yup.object().shape({
    title: Yup.string().required().min(3).max(50),
    content: Yup.string().max(500),
    tag: Yup.string()
      .required()
      .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"]),
  });

  const mutation = useMutation({
    mutationFn: addNotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      closeModal();
    },
  });
  const handleSubmit = (
    values: InitialValuesFields,
    actions: FormikHelpers<InitialValuesFields>,
  ) => {
    mutation.mutate(values);
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Schema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage component="span" className={css.error} name="title" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
