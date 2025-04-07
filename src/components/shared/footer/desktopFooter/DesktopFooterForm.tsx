import { Button, Textarea, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { client } from "app/lib/sanity";
import { notifications } from '@mantine/notifications';
// Define the FooterFormProps interface
interface FooterFormProps {
  t: (key: string) => string; // Function for translating keys to string
  styles: {
    inputRow: string;
    input: string;
    textarea: string;
    submitButton: string;
  };
}

// Define the FooterForm component using React.FC and FooterFormProps
const FooterForm: React.FC<FooterFormProps> = ({ t, styles }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    notifications.show({
      title: "Success",
      message: "Form submitted successfully!",
      color: "green",
    });
    try {
      await client.create({
        _type: "contactForm", // Schema name in Sanity
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: new Date().toISOString(),
      });

      notifications.show({
        title: "Success",
        message: "Form submitted successfully!",
        color: "green",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {

      notifications.show({
        title: "Error",
        message: "Failed to submit the form. Please try again later.",
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.inputRow}>
        <TextInput
          name="name"
          placeholder={t("footer.form.namePlaceholder")}
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextInput
          name="email"
          type="email"
          placeholder={t("footer.form.mailPlaceholder")}
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <Textarea
        name="message"
        placeholder="Write your message here"
        className={styles.textarea}
        value={formData.message}
        onChange={handleChange}
        required
      />
      <Button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {t("footer.form.send")}
      </Button>
    </form>
  );
};

export default FooterForm;
