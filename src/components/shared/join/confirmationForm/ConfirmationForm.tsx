import { Text } from "@mantine/core";
import React from "react";

import styles from "./ConfirmationForm.module.scss";

interface ConfirmationFormProps {
  onBack: () => void;
}

const ConfirmationForm: React.FC<ConfirmationFormProps> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        {/* Replace with actual NPP logo */}
        <div className={styles.placeholderLogo}>NPP</div>
      </div>
      <Text size="xl" style={{ textAlign: "center", fontWeight: 700 }}>
        Thanks for joining NPP
      </Text>
      <Text size="sm" mt="md" style={{ textAlign: "center" }}>
        I certify that the above-provided information is correct and there is no
        mistake. I know that all further communication will be done on the
        above-provided details.
      </Text>
    </div>
  );
};

export default ConfirmationForm;
