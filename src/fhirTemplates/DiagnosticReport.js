export const DiagnosticReport_object_template =  {
    resourceType: "DiagnosticReport",
    id: "01",
    code: {
      coding: [
        {
          system: "https://loinc.org",
          code: "29308-4",
          display: "Diagnosis"
        }
      ]
    },
    subject: {
      reference: "#me"
    },
    performer: [
      {
        reference: "orginaztionURL"
      }
    ],
    conclusion: "..."
  }