import { Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import { useId } from "react";

interface InitialValuesFields {
  title: string;
  content: string;
  tag: string;
}

const initialValues: InitialValuesFields = {
  title: "",
  content: "",
  tag: "",
};

interface NoteFormProps {
  closeModal: () => void;
}
export default function NoteForm({ closeModal }: NoteFormProps) {
  const fieldId = useId();

  const handleSubmit = (
    values: InitialValuesFields,
    actions: FormikHelpers<InitialValuesFields>,
  ) => {
    console.log(values);
    actions.resetForm();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          {/* <span htmlFor={`${fieldId}-title`} className={css.error} /> */}
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textArea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          {/* <span htmlFor={`${fieldId}-content`} className={css.error} /> */}
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          {/* <span htmlFor={`${fieldId}-tag`} className={css.error} /> */}
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
