



export default {
  name: "membershipForm",
  title: "Membership Form",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule: import("@sanity/types").Rule) => Rule.required(),
    },
    {
      name: "mobileNumber",
      title: "Mobile Number",
      type: "string",
      validation: (Rule: import("@sanity/types").Rule) => Rule.required().min(10).max(15),
    },
    {
      name: "emailId",
      title: "Email ID",
      type: "string",
      validation: (Rule: import("@sanity/types").Rule) => Rule.required().email(),
    },
    {
      name: "certify",
      title: "Certify",
      type: "boolean",
      validation: (Rule: import("@sanity/types").Rule) => Rule.required(),
    },
    {
      name: "memberType",
      title: "Member Type",
      type: "string",
      options: {
        list: ["Regular", "Associate", "Honorary"], // Adjust options as needed
      },
    },
    {
      name: "isIndianCitizen",
      title: "Is Indian Citizen",
      type: "string",
      options: {
        list: ["Yes", "No"],
      },
    },
    {
      name: "isResidingInIndia",
      title: "Is Residing in India",
      type: "string",
      options: {
        list: ["Yes", "No"],
      },
    },
    {
      name: "dateOfBirth",
      title: "Date of Birth",
      type: "date",
    },
    {
      name: "gender",
      title: "Gender",
      type: "string",
      options: {
        list: ["Male", "Female", "Other"],
      },
    },
    {
      name: "homeAddress",
      title: "Home Address",
      type: "text",
    },
    {
      name: "district",
      title: "District",
      type: "string",
    },
    {
      name: "state",
      title: "State",
      type: "string",
    },
    {
      name: "assemblyConstituency",
      title: "Assembly Constituency",
      type: "string",
    },
    {
      name: "pincode",
      title: "Pincode",
      type: "string",
      validation: (Rule: import("@sanity/types").Rule) => Rule.min(6).max(6),
    },
    {
      name: "assemblyPincode",
      title: "Assembly Pincode",
      type: "string",
      validation: (Rule: import("@sanity/types").Rule) => Rule.min(6).max(6),
    },
    {
      name: "receiveUpdates",
      title: "Receive Updates",
      type: "boolean",
    },
  ],
};
