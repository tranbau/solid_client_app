export const MedicationAdministration_object_template = {
  resourceType: "MedicationAdministration",
  id: "01",
  subject: {
    reference: "/patient/01",
  },
  reason: [
    {
      reference: {
        reference: "observationURL",
      },
    },
    {
      reference: {
        reference: "dignosticReportURL",
      },
    },
    {
      reference: {
        reference: "ClinicalImpressionURL",
      },
    },
  ],
  medication: {
    concept: {
      coding: [
        {
          system: "http://snomed.info/sct",
          code: "763158003",
          display: "Medicinal product",
        },
      ],
    },
  },
  note: [
    {
      text: "scheduleName",
    },
    {
      text: "scheduleImageURL",
    },
  ],
  recorded: "2023-01-01",
};
