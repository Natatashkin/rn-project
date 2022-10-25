import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Formik } from "formik";
import {
  DEFAULT_REGISTRATION_FORM_VALUES,
  FORM_FIELDS_NAMES,
} from "../../screens/constants";
import { registrationSchema } from "../../schemas";
import { useUser } from "../../context";
import { InputText } from "../InputText";
import { Button } from "../Button";
import { FormValidationError } from "../FormValidationError";

export default function RegistrationForm({ wasFocused }) {
  const { registerUser } = useUser();
  const [showErrors, setShowErrors] = useState(false);

  const onSubmit = async (values) => {
    await registerUser(values);
    setShowErrors(false);
  };

  return (
    <Formik
      initialValues={DEFAULT_REGISTRATION_FORM_VALUES}
      onSubmit={onSubmit}
      validationSchema={registrationSchema}
      validateOnChange={showErrors}
    >
      {({
        handleChange,
        handleSubmit,
        resetForm,
        submitCount,
        values,
        errors,
      }) => {
        useEffect(() => {
          if (submitCount > 0) {
            setShowErrors(true);
          }
        }, [submitCount]);

        return (
          <ScrollView contentContainerStyle={styles.form}>
            <View style={styles.formFieldContainer}>
              <InputText
                value={values.name}
                placeholder="Ім'я"
                onChangeText={handleChange(FORM_FIELDS_NAMES.name)}
                wasFocused={wasFocused}
              />
              {errors?.name && <FormValidationError error={errors.name} />}
            </View>

            <View style={styles.formFieldContainer}>
              <InputText
                value={values.email}
                placeholder="Електронна адреса"
                onChangeText={handleChange(FORM_FIELDS_NAMES.email)}
                keyboardType="email-address"
                wasFocused={wasFocused}
              />
              {errors?.email && <FormValidationError error={errors.email} />}
            </View>

            <View style={styles.formFieldContainer}>
              <InputText
                value={values.password}
                placeholder="Пароль"
                onChangeText={handleChange(FORM_FIELDS_NAMES.password)}
                secureTextEntry
                wasFocused={wasFocused}
              />
              {errors?.password && (
                <FormValidationError error={errors.password} />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={handleSubmit} title="Зареєструватися" />
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 20,
  },
  formFieldContainer: {
    height: 72,
    justifyContent: "flex-start",
  },
  buttonContainer: {
    marginTop: 18,
  },
});
