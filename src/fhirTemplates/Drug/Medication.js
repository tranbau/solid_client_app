export const Medication_object_template = {
  resourceType: "Medication",
  code: {
    coding: [
      {
        system: "https://www.snomed.org",
        code: "123",
      },
    ],
  },
  marketingAuthorizationHolder: {
    reference: "companyURL",
  },
};
