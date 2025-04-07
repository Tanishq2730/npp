import { Button, Checkbox, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

import { useFormContext } from "../FormContext";
import styles from "./PersonalDetailsForm.module.scss";

interface PersonalDetailsFormProps {
  onNext: () => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  onNext,
}) => {
  const { formData, updateFormData } = useFormContext();

  const form = useForm({
    initialValues: {
      name: formData.name,
      mobileNumber: formData.mobileNumber,
      emailId: formData.emailId,
      certify: false,
    },
    validate: {
      name: (value) => (value.length < 2 ? "Name is too short" : null),
      mobileNumber: (value) =>
        /^\d{10}$/.test(value) ? null : "Invalid mobile number",
      emailId: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      certify: (value) => (value ? null : "You must certify"),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    updateFormData(values);
    onNext();
  });

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Personal Details</h2>
      <TextInput
        label="Name"
        placeholder="Enter your full name"
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Mobile number"
        placeholder="Enter your mobile number"
        {...form.getInputProps("mobileNumber")}
      />
      <TextInput
        label="Email ID"
        placeholder="Enter your Email id"
        {...form.getInputProps("emailId")}
      />
      <Checkbox
        color="#EEA938"
        label="I certify that above provided information is correct and there is no mistake. I know that all further communication will be done on above provided details."
        {...form.getInputProps("certify", { type: "checkbox" })}
      />
      <Button type="submit" fullWidth className={styles.nextButton}>
        Next
      </Button>
    </form>
  );
};

export default PersonalDetailsForm;
