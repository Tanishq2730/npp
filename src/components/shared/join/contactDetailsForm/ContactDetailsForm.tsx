import {
  Box,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  
  SegmentedControl,
  Text,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import axios from "axios";
import React, { useState } from "react";

import type { FormData } from "../FormContext";
import { useFormContext } from "../FormContext";
import styles from "./ContactDetailsForm.module.scss";
import { client } from "app/lib/sanity";
interface ContactDetailsFormProps {
  onNext: () => void;
  onBack: () => void;
}

interface PostOffice {
  Name: string;
  District: string;
  State: string;
}

const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({
  onNext,
  onBack,
}) => {
  const { formData, updateFormData } = useFormContext();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    initialValues: {
      // Personal Details
      name: formData.name || "",
      mobileNumber: formData.mobileNumber || "",
      emailId: formData.emailId || "",
      certify: formData.certify || false,
      // Contact Details
      memberType: formData.memberType || "member",
      isIndianCitizen: formData.isIndianCitizen || "Yes",
      isResidingInIndia: formData.isResidingInIndia || "Yes",
      dateOfBirth: formData.dateOfBirth || null,
      gender: formData.gender || "Male",
      homeAddress: formData.homeAddress || "",
      district: formData.district || "",
      state: formData.state || "",
      pincode: formData.pincode || "",
      assemblyConstituency: formData.assemblyConstituency || "",
      assemblyPincode: formData.assemblyPincode || "",
   
      receiveUpdates: formData.receiveUpdates || false,
    },
    validate: {
      homeAddress: (value) => (value ? null : "Home address is required"),
      district: (value) => (value ? null : "District is required"),
      state: (value) => (value ? null : "State is required"),
      pincode: (value) => (value ? null : "Pincode is required"),
      dateOfBirth: (value) => (value ? null : "Date of birth is required"),
     
    },
  });

  const handlePincodeChange = async (pincode: string) => {
    if (pincode.length === 6) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`,
        );
        if (response.data[0].Status === "Success") {
          const postOffice: PostOffice = response.data[0].PostOffice[0];
          form.setFieldValue("district", postOffice.District);
          form.setFieldValue("state", postOffice.State);
        } else {
          form.setFieldError("pincode", "Invalid pincode");
        }
      } catch (error) {
        form.setFieldError("pincode", "Error fetching pincode data");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = form.onSubmit(async   (values) => {

    updateFormData(values);
   
    console.log(values)
    try {
      const doc = {
        _type: "membershipForm", // This should match your Sanity schema name
        ...values,
      };
  
      // Save to Sanity
      const response = await client.create(doc);
      console.log("✅ Data saved to Sanity:", response);
  
      // Move to the next step (if needed)
      onNext();
    } catch (error) {
      console.error("❌ Error saving data to Sanity:", error);
    }
  
  });

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <LoadingOverlay visible={loading} />
      <Text className={styles.congratsText}>
        Congratulations! You have now become a Portal user. If you want to join
        as a member, please continue.
      </Text>

      <SegmentedControl
        fullWidth
        data={[
          { label: "As a member", value: "member" },
          { label: "As a volunteer", value: "volunteer" },
        ]}
        {...form.getInputProps("memberType")}
        classNames={{ root: styles.segmentedControl }}
      />

      <Group className={styles.questionGroup}>
        <Text>Are you an Indian Citizen?*</Text>
        <SegmentedControl
          data={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
          {...form.getInputProps("isIndianCitizen")}
          classNames={{ root: styles.yesNoControl }}
        />
      </Group>

      <Group className={styles.questionGroup}>
        <Text>Are you Residing in India?*</Text>
        <SegmentedControl
          data={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
          {...form.getInputProps("isResidingInIndia")}
          classNames={{ root: styles.yesNoControl }}
        />
      </Group>

      <Group align="flex-end" className={styles.questionGroup}>
        <Box className={styles.dateOfBirth}>
          <Text>Date of Birth*</Text>
          <DateInput
            placeholder="Pick a date"
            {...form.getInputProps("dateOfBirth")}
            error={form.errors.dateOfBirth}
          />
        </Box>
        <Box className={styles.genderControl}>
          <Text>Gender*</Text>
          <SegmentedControl
            data={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Other", value: "Other" },
            ]}
            {...form.getInputProps("gender")}
            classNames={{ root: styles.yesNoControl }}
          />
        </Box>
      </Group>

      <Text style={{ fontWeight: 700, marginTop: "1rem" }}>
        Contact Details
      </Text>

      <TextInput
        label="Home address"
        placeholder="Enter your home address"
        {...form.getInputProps("homeAddress")}
        error={form.errors.homeAddress}
      />

      <Group grow>
        <TextInput
          label="Pincode*"
          placeholder="Enter pincode"
          {...form.getInputProps("pincode")}
          error={form.errors.pincode}
          onChange={(event) => {
            form.setFieldValue("pincode", event.currentTarget.value);
            handlePincodeChange(event.currentTarget.value);
          }}
        />
        <TextInput
          label="District*"
          placeholder="District"
          {...form.getInputProps("district")}
          error={form.errors.district}
          disabled
        />
      </Group>

      <Group grow>
        <TextInput
          label="State*"
          placeholder="State"
          {...form.getInputProps("state")}
          error={form.errors.state}
          disabled
        />
      </Group>

      {/* <Group align="flex-end" mt="md" className={styles.contributionGroup}>
        <Text style={{ fontWeight: 700, fontSize: "1.25rem" }}>
          YOUR CONTRIBUTION
        </Text>
        <NumberInput
          placeholder="₹100-₹1000000"
          min={1}
          max={1000000}
          {...form.getInputProps("contribution")}
          styles={{ input: { width: "200px" } }}
          error={form.errors.contribution}
        />
      </Group> */}
      {/* <Text>Total Amount</Text>
      <Text style={{ color: "orange", fontWeight: 700 }}>
        ₹{form.values.contribution || 0}
      </Text> */}

      <Checkbox
        color="yellow"
        mt="md"
        label="I am willing to receive regular NPP updates."
        {...form.getInputProps("receiveUpdates", { type: "checkbox" })}
      />

      <Group style={{ marginTop: "1.5rem" }}>
        <Button
          variant="default"
          onClick={onBack}
          className={styles.backButton}
        >
          Back
        </Button>
        <Button type="submit" className={styles.submitButton}>
          Register and contribute
        </Button>
      </Group>
    </form>
  );
};

export default ContactDetailsForm;
