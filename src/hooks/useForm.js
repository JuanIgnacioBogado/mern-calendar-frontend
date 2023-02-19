/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect } from 'react';

export const useForm = (initialState = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialState);

  const handleInputChange = ({ target: { name, value } }) => setFormState({ ...formState, [name]: value });

  const resetForm = () => setFormState(initialState);

  const formValidation = useMemo(
    () =>
      Object.keys(formValidations).reduce((acc, formField) => {
        const [fn, errorMessage] = formValidations[formField];

        return {
          ...acc,
          [`${formField}Valid`]: fn(formState[formField]) ? null : errorMessage
        };
      }, {}),
    [formState]
  );

  const isFormValid = useMemo(() => Object.values(formValidation).every(v => v === null), [formValidation]);

  useEffect(() => resetForm(), [initialState]);

  return {
    ...formState,
    ...formValidation,
    formValidation,
    formState,
    isFormValid,
    handleInputChange,
    resetForm
  };
};
