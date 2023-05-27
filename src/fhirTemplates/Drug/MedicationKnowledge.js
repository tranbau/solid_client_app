export const MedicationKnowledge_object_template =  {
    resourceType: "MedicationKnowledge",
    id: "01",
    name: [
      "paradol"
    ],
    author: {
      reference: "CountryURL",
      display: "VietNam - Nguyen Van A"
    },
    indicationGuideline: [
      {
        dosingGuideline: [
          {
            patientCharacteristic: [
              {
                type: {
                  text: "..."
                },
                valueCodeableConcept: {
                  coding: [
                    {
                      system: "hrsa.gov"
                    }
                  ],
                  text: "..."
                }
              }
            ],
            treatmentIntent: {
              text: "to..."
            },
            dosage: [
              {
                type: {
                  text: "..."
                },
                dosage: [
                  {
                    text: "you need to ..."
                  }
                ]
              }
            ],
            administrationTreatment: {
              text: "warning"
            }
          }
        ]
      }
    ],
    storageGuideline: [
      {
        note: [
          {
            text: "You need to..."
          }
        ]
      }
    ],
    productType: [
      {
        text: "typeABC"
      }
    ],
    regulatory: [
      {
        regulatoryAuthority: {
          reference: "systemURL",
          display: "standardName"
        }
      }
    ],
    associatedMedication: [
      {
        reference: "medicationURL"
      }
    ]
  }