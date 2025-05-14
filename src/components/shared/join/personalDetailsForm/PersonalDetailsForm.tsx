import React from "react";
import {
  Button,
  Checkbox,
  TextInput,
  Textarea,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useFormContext } from "../FormContext";
import { FormData } from "../types"; // import shared type
import styles from "./PersonalDetailsForm.module.scss";

interface PersonalDetailsFormProps {
  onNext: () => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext();

  const form = useForm<FormData>({
    initialValues: {
      name: formData.name || "",
      address: formData.address || "",
      panNumber: formData.panNumber || "",
      aadharFile: formData.aadharFile || null,
      panFile: formData.panFile || null,
      certify: formData.certify || false,
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? "Name is too short" : null),
      address: (value) =>
        value.trim().length < 5 ? "Address is too short" : null,
      panNumber: (value) =>
        /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)
          ? null
          : "Invalid PAN format",
      aadharFile: (value) =>
        value instanceof File ? null : "Aadhar card file required",
      panFile: (value) =>
        value instanceof File ? null : "PAN card file required",
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
        withAsterisk
        {...form.getInputProps("name")}
      />

      <Textarea
        label="Address"
        placeholder="Enter your residential address"
        withAsterisk
        {...form.getInputProps("address")}
      />

      <TextInput
        label="PAN Number"
        placeholder="Enter your PAN"
        withAsterisk
        {...form.getInputProps("panNumber")}
      />

      <FileInput
        label="Upload Aadhar Card"
        placeholder="Choose Aadhar file"
        accept="image/*,.pdf"
        withAsterisk
        value={form.values.aadharFile}
        onChange={(file) => form.setFieldValue("aadharFile", file)}
        error={form.errors.aadharFile}
      />

      <FileInput
        label="Upload PAN Card"
        placeholder="Choose PAN file"
        accept="image/*,.pdf"
        withAsterisk
        value={form.values.panFile}
        onChange={(file) => form.setFieldValue("panFile", file)}
        error={form.errors.panFile}
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
