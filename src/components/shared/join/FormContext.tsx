import type { ReactNode } from "react";
import React, { createContext, useContext, useMemo, useState } from "react";

interface FormData {
  // Personal Details
  name: string;
  mobileNumber: string;
  emailId: string;
  certify: boolean;
  // Contact Details
  memberType: string;
  isIndianCitizen: string;
  isResidingInIndia: string;
  dateOfBirth: Date | null;
  gender: string;
  homeAddress: string;
  district: string;
  state: string; // Added state field
  assemblyConstituency: string;
  pincode: string;
  assemblyPincode: string;

  receiveUpdates: boolean;
}

interface FormContextType {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobileNumber: "",
    certify: false,
    emailId: "",
    memberType: "member",
    isIndianCitizen: "Yes",
    isResidingInIndia: "Yes",
    dateOfBirth: null,
    gender: "Male",
    homeAddress: "",
    district: "",
    state: "", // Added state field with empty string as initial value
    assemblyConstituency: "",
    pincode: "",
    assemblyPincode: "",
    receiveUpdates: false,
  });

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const value = useMemo(() => ({ formData, updateFormData }), [formData]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export type { FormData };
