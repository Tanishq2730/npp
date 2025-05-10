import { Button, Checkbox, TextInput, Textarea, FileInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

import { useFormContext } from "../FormContext";
import styles from "./PersonalDetailsForm.module.scss";

interface PersonalDetailsFormProps {
  onNext: () => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext();

  const form = useForm({
    initialValues: {
      name: formData.name || "",
      address: formData.address || "",
      panNumber: formData.panNumber || "",
      aadharFile: null,
      panFile: null,
      certify: false,
    },
    validate: {
      name: (value) => (value.length < 2 ? "Name is too short" : null),
      address: (value) => (value.length < 5 ? "Address is too short" : null),
      panNumber: (value) =>
        /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value) ? null : "Invalid PAN format",
      aadharFile: (value) => (value ? null : "Aadhar card file required"),
      panFile: (value) => (value ? null : "PAN card file required"),
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

      <Textarea
        label="Address"
        placeholder="Enter your residential address"
        {...form.getInputProps("address")}
      />

      <TextInput
        label="PAN Number"
        placeholder="Enter your PAN"
        {...form.getInputProps("panNumber")}
      />

      <FileInput
        label="Upload Aadhar Card"
        placeholder="Choose Aadhar file"
        accept="image/*,.pdf"
        {...form.getInputProps("aadharFile")}
      />

      <FileInput
        label="Upload PAN Card"
        placeholder="Choose PAN file"
        accept="image/*,.pdf"
        {...form.getInputProps("panFile")}
      />

      <Checkbox
        color="#EEA938"
        label="I certify that the above provided information is correct."
        {...form.getInputProps("certify", { type: "checkbox" })}
      />

      <Button type="submit" fullWidth className={styles.nextButton}>
        Next
      </Button>
    </form>
  );
};

export default PersonalDetailsForm;
