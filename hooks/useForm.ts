import { ChangeEvent, SyntheticEvent, useState } from "react";

export const useForm = (initialState = {}, onSubmit: (values: {}) => void) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit?.(formValues);
  };

  return { formValues, handleInputChange, handleSubmit };
};
