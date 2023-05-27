export const MedicationRequest_object_template = {
  resourceType: "MedicationRequest",
  id: "01",
  subject: {
    reference: "#me",
  },
  status: "active",
  effectiveDosePeriod: {
    start: "2015-03-07T13:28:17.239+02:00",
    end: "2015-04-07T13:28:17.239+02:00",
  },
  medication: {
    reference: {
      reference: "/medication/01",
    },
  },
  supportingInformation: [
    {
      reference: "imgURL",
    },
  ],
  priority: "routine",
  note: [
    {
      text: "Standard",
    },
  ],
  dispenseRequest: {
    quantity: {
      value: 0,
      unit: "vien",
    },
  },
  authoredOn: "2023-01-01",
};
