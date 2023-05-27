export const MedicationStatement_object_template =  {
    resourceType: "MedicationStatement",
    status: "record",
    subject: {
      reference: "#me"
    },
    medication: {
      reference: {
        reference: "MedicationRequestURL"
      }
    },
    effectiveDateTime: "2015-02-07T13:28:17.239+02:00",
    adherence: {
      code: {
        coding: [
          {
            system: "http://hl7.org/fhir/CodeSystem/medication-statement-adherence",
            display: "taking"
          }
        ]
      }
    }
  }