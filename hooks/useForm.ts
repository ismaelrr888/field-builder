import { ChangeEvent, SyntheticEvent, useState } from "react";

type FormState = Record<string, any>;

export const useForm = (
  initialState: FormState = {},
  onSubmit: (values: {}) => void
) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | any>) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit?.(formValues);
  };

  return { formValues, handleInputChange, handleSubmit };
};
