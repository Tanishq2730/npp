import { BackgroundImage, Box, Paper, Stepper, Title } from "@mantine/core";
import React, { useState } from "react";

import ConfirmationForm from "./confirmationForm/ConfirmationForm";
import ContactDetailsForm from "./contactDetailsForm/ContactDetailsForm";
import { FormProvider } from "./FormContext";
import styles from "./Join.module.scss";
import PersonalDetailsForm from "./personalDetailsForm/PersonalDetailsForm";

interface JoinNPPProps {
  title: string;
}

const JoinNPP: React.FC<JoinNPPProps> = ({ title }) => {
  const [active, setActive] = useState(0);

  const getBackgroundImage = () => {
    switch (active) {
      case 0:
        return "/static/images/join/personal-details-background.png";
      case 1:
        return "/static/images/join/contact-details-background.png";
      case 2:
        return "/static/images/join/confirmation-background.png";
      default:
        return "/static/images/join/join-background.png";
    }
  };

  return (
    <FormProvider>
      <Box className={styles.container}>
        <BackgroundImage
          src={getBackgroundImage()}
          className={styles.backgroundImage}
        />
        <Paper shadow="md" p="xl" className={styles.formContainer}>
          <Title order={2} mb="xl">
            {title}
          </Title>
          <Stepper
            active={active}
            classNames={{ root: styles.stepper }}
            size="sm"
            iconSize={24}
            color="#EEA938"
          >
            <Stepper.Step label="Personal details" />
            <Stepper.Step label="Contact details" />
            <Stepper.Step label="Confirm" />
          </Stepper>

          <Box mt="xl">
            {active === 0 && (
              <PersonalDetailsForm onNext={() => setActive(1)} />
            )}
            {active === 1 && (
              <ContactDetailsForm
                onNext={() => setActive(2)}
                onBack={() => setActive(0)}
              />
            )}
            {active === 2 && <ConfirmationForm onBack={() => setActive(1)} />}
          </Box>
        </Paper>
      </Box>
    </FormProvider>
  );
};

export default JoinNPP;
