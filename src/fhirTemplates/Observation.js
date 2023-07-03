export const Observation_object_template = {
    resourceType: "Observation",
    id: "01",
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "8716-3",
          display: "Vital signs",
        },
      ],
    },
    subject: {
      reference: "/patient/01",
      type: "patient",
    },
    component: [
      {
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "3141-91",
              display: "Body weight",
            },
          ],
          text: "Body weight",
        },
        valueQuantity: {
          value: 0,
          unit: "kg",
        },
        valueDateTime: "2015-02-07T13:28:17.239+02:00",
      },
      {
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "8867-4",
              display: "Heart rate",
            },
          ],
          text: "Heart rate",
        },
        valueQuantity: {
          value: 0,
          unit: "bpm",
        },
        valueDateTime: "2015-02-07T13:28:17.239+02:00",
      },
      {
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "8310-5",
              display: "temperature",
            },
          ],
          text: "Temperature",
        },
        valueQuantity: {
          value: 0,
          unit: "C",
        },
        valueDateTime: "2015-02-07T13:28:17.239+02:00",
      },
      {
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "8480-6",
              display: "systolic blood pressure",
            },
          ],
          text: "Systolic blood pressure",
        },
        valueQuantity: { 
          value: 0,
          unit: "mmHg",
        },
        valueDateTime: "2015-02-07T13:28:17.239+02:00",
      },
      {
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "8462-4",
              display: "diastolic blood pressure",
            },
          ],
          text: "Diastolic blood pressure",
        },
        valueQuantity: {
          value: 0,
          unit: "mmHg",
        },
        valueDateTime: "2015-02-07T13:28:17.239+02:00",
      },
      {
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "2708-6",
              display: "Oxygen saturation in Arterial blood",
            },
          ],
          text: "Oxygen saturation in Arterial blood",
        },
        valueQuantity: {
          value: 0,
          unit: "%",
        },
        valueDateTime: "2015-02-07T13:28:17.239+02:00",
      },
      {
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "74738-1",
              display: "QT interval",
            },
          ],
          text: "QT interval",
        },
        valueQuantity: {
          value: 0,
          unit: "ms",
        },
        valueDateTime: "2015-02-07T13:28:17.239+02:00",
      },
      {
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "55463-8",
              display: "ST segment",
            },
          ],
          text: "ST segment",
        },
        valueQuantity: {
          value: 0,
          unit: "mV",
        },
        valueDateTime: "2015-02-07T13:28:17.239+02:00",
      },
      {
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "86250-7",
              display: "T wave",
            },
          ],
          text: "T wave",
        },
        valueQuantity: {
          value: 0,
          unit: "mV",
        },
        valueDateTime: "2015-02-07T13:28:17.239+02:00",
      },
      {
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "86247-3",
              display: "P wave",
            },
          ],
          text: "P wave",
        },
        valueQuantity: {
          value: 0,
          unit: "mV",
        },
        valueDateTime: "2015-02-07T13:28:17.239+02:00",
      },
    ],
  };
  