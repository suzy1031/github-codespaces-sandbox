import React, { useState } from "react";
import { string, z, ZodError } from "zod";
import { FormData, FormSchema } from "../schema";

const useZodForm = () => {
  const [formData, setFormData] = useState<FormData | {}>({
    spouse: 1,
    agree: true,
    emails: {},
  });

  const [errors, setErrors] = useState<z.ZodFormattedError<FormData> | null>(
    null
  );

  const handleChangeEmail = (
    type: string,
    fieldName: string,
    value: string
  ) => {
    if (type === "email") {
      setFormData((prev: FormData) => ({
        ...prev,
        emails: {
          ...prev.emails,
          [fieldName]: value,
        },
      }));
    }
  };

  const handleChangeCheckbox = (
    type: string,
    fieldName: string,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (type === "checkbox") {
      const _checkbox = e.target as HTMLInputElement;
      const _isChecked = _checkbox.checked;
      setFormData((prev) => ({ ...prev, [fieldName]: _isChecked }));
    }
  };

  const handleChangeInit = (type: string, fieldName: string) => {
    if (type === "") {
      setFormData((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleChangeCastNumber = (fieldName: string, value: string) => {
    if (/^[0-9]+$/.test(value)) {
      setFormData((prev) => ({ ...prev, [fieldName]: Number(value) }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, name, value, type } = e.target;
    const fieldName = id || name;

    handleChangeEmail(type, fieldName, value);
    handleChangeCheckbox(type, fieldName, e);
    handleChangeInit(type, fieldName);
    handleChangeCastNumber(fieldName, value);
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);

    try {
      FormSchema.parse(formData);
      console.log(formData);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.format());
        setErrors(error.format());
      }
    }
  };

  return { errors, handleChange, handleSubmit };
};
export default useZodForm;
