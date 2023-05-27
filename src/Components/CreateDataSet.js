import { fhir } from "rdf-namespaces";
import { useSelector } from "react-redux";
import {
  createSolidDataset,
  setThing,
  saveSolidDatasetAt,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { useState } from "react";
import { generateThings } from "../Ultis/generateThings";
const Observation_object_template = {
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


function CreatDataset() {
  const webId = useSelector((state) => state.user.webId);
  const baseURl = new URL(webId).origin;
  const [vitalSigns, setVitalSigns] = useState({});
  const [dataSet, setDataSet] = useState("");


  const createThings = async () => {
    const observationURI = `${baseURl}/test/${dataSet}`; //test: default container
    
    //only store one observation thing for each user => thingName : Observation
    // if more => thingName : Observation01,....
    
    const new_Observation = {...Observation_object_template};
    new_Observation.component[0].valueQuantity.value = Number(vitalSigns.weight);
    new_Observation.component[0].valueDateTime = new Date().toISOString();
    new_Observation.component[1].valueQuantity.value = Number(vitalSigns.heartRate);
    new_Observation.component[1].valueDateTime = new Date().toISOString();
    new_Observation.component[2].valueQuantity.value = Number(vitalSigns.temperature);
    new_Observation.component[2].valueDateTime = new Date().toISOString();

    const things = generateThings(
      fhir.Observation,
      new_Observation,
      "Observation",
    );
    //create new dataset => add all created things
    let newDataset = createSolidDataset();
    things.map((thing) => {
      newDataset = setThing(newDataset, thing);
      return thing;
    });

    await saveSolidDatasetAt(
      observationURI,
      newDataset,
      { fetch: fetch } // fetch from authenticated Session
    )
      .then(() => {
        alert("Create succesfully!");
        
      })
      .catch((error) => {
        console.log(error);
        alert("Failed");
      });
  };

  return (
    <div>
      <ul>
        <li>
          <label>Dataset name</label>
          <input
            value={dataSet}
            onChange={(e) => {
              setDataSet(e.target.value);
            }}
            required={true}
          />
        </li>
        <li>
          <label>Weight</label>
          <input
            value={vitalSigns.weight}
            onChange={(e) => {
              setVitalSigns({
                ...vitalSigns,
                weight: e.target.value,
              });
            }}
            required={true}
          />
        </li>
        <li>
          <label>Heart Rate</label>
          <input
            value={vitalSigns.heartRate}
            onChange={(e) => {
              setVitalSigns({
                ...vitalSigns,
                heartRate: e.target.value,
              });
            }}
            required={true}
          />
        </li>
        <li>
          <label>Temperature</label>
          <input
            value={vitalSigns.temperature}
            onChange={(e) => {
              setVitalSigns({
                ...vitalSigns,
                temperature: e.target.value,
              });
            }}
            required={true}
          />
        </li>
      </ul>
      <button onClick={() => createThings()}>Create</button>
    </div>
  );
}
export default CreatDataset;
