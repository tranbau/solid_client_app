/* eslint-disable array-callback-return */
import { useState } from "react";
import { fetch } from "@inrupt/solid-client-authn-browser";
import {
  setThing,
  saveSolidDatasetAt,
  getSolidDataset,
  getThing,
  setStringNoLocale,
  getDecimal,
  setDecimal,
} from "@inrupt/solid-client";
import { fhir } from "rdf-namespaces";
import { generatePath } from "../Ultis/generatePath";
import { useSelector } from "react-redux";
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

function VitalSigns() {
  const [vitalSigns, setVitalSigns] = useState({});
  const [status, setStatus] = useState(-1); // -1 - no dataset entered, 0 - loading, 1 - nodata, 2 - data existed
  const [dataSet, setDataSet] = useState("");
  const webId = useSelector((state) => state.user.webId);
  const baseURl = new URL(webId).origin;
  const [edit, setEdit] = useState(false);

  //generate path (name thing in thing url)
  const Observation_object = { ...Observation_object_template };
  generatePath(fhir.Observation, Observation_object);

  //fetchData (weight) from pod
  const fetchData = async () => {
    setStatus(0);
    const observationURI = `${baseURl}/test/${dataSet}`; //test: default container

    const myDataset = await getSolidDataset(
      observationURI,
      { fetch: fetch } // fetch from authenticated session
    ).catch((error) => setStatus(1));

    if (myDataset) {
      //weight
      const myWeightThing = getThing(
        myDataset,
        `${observationURI}#${Observation_object.component[0].valueQuantity.value}`
      );

      //temperature
      const myTemperatureThing = getThing(
        myDataset,
        `${observationURI}#${Observation_object.component[2].valueQuantity.value}`
      );

      //heart rate
      const myHeartRateThing = getThing(
        myDataset,
        `${observationURI}#${Observation_object.component[1].valueQuantity.value}`
      );

      if (myWeightThing && myHeartRateThing && myTemperatureThing) {
        setStatus(2);
        setVitalSigns({
          ...vitalSigns,
          weight: getDecimal(myWeightThing, fhir.v).toString(),
          heartRate: getDecimal(myHeartRateThing, fhir.v).toString(),
          temperature: getDecimal(myTemperatureThing, fhir.v).toString(),
        });
      } else {
        setStatus(1);
        console.log(myHeartRateThing, myWeightThing, myTemperatureThing);
      }
    }
  };

  //change weight
  const handleSubmit = async () => {
    if (!edit) return;
    const observationURI = `${baseURl}/test/${dataSet}`;
    let myDataset = await getSolidDataset(
      observationURI,
      { fetch: fetch } // fetch from authenticated session
    );
    if (myDataset) {
      //weight
      let myWeightThing = getThing(
        myDataset,
        `${observationURI}#${Observation_object.component[0].valueQuantity.value}`
      );
      let weightTime = getThing(
        myDataset,
        `${observationURI}#${Observation_object.component[0].valueDateTime}`
      );

      //heart rate
      let myHeartRateThing = getThing(
        myDataset,
        `${observationURI}#${Observation_object.component[1].valueQuantity.value}`
      );

      let heartRateTime = getThing(
        myDataset,
        `${observationURI}#${Observation_object.component[1].valueDateTime}`
      );

      //temperature
      let myTemperatureThing = getThing(
        myDataset,
        `${observationURI}#${Observation_object.component[2].valueQuantity.value}`
      );

      let temperatureTime = getThing(
        myDataset,
        `${observationURI}#${Observation_object.component[2].valueDateTime}`
      );

      if (myWeightThing && myHeartRateThing && myTemperatureThing) {
        //change thing
        myWeightThing = setDecimal(
          myWeightThing,
          fhir.v,
          Number(vitalSigns.weight)
        );
        myHeartRateThing = setDecimal(
          myHeartRateThing,
          fhir.v,
          Number(vitalSigns.heartRate)
        );
        myTemperatureThing = setDecimal(
          myWeightThing,
          fhir.v,
          Number(vitalSigns.temperature)
        );

        weightTime = setStringNoLocale(
          weightTime,
          fhir.v,
          new Date().toISOString()
        );

        heartRateTime = setStringNoLocale(
          heartRateTime,
          fhir.v,
          new Date().toISOString()
        );

        temperatureTime = setStringNoLocale(
          temperatureTime,
          fhir.v,
          new Date().toISOString()
        );

        //change dataset
        myDataset = setThing(myDataset, myWeightThing);
        myDataset = setThing(myDataset, myTemperatureThing);
        myDataset = setThing(myDataset, myHeartRateThing);
        myDataset = setThing(myDataset, weightTime);
        myDataset = setThing(myDataset, temperatureTime);
        myDataset = setThing(myDataset, heartRateTime);

        //save dataset
        await saveSolidDatasetAt(
          observationURI,
          myDataset,
          { fetch: fetch } // fetch from authenticated Session
        )
          .then(() => alert("Edit successfully"))
          .catch((error) => {
            console.log(error);
            alert("Failed");
          });
      } else {
        alert("No chosen dataset");
      }
    }
    setEdit(false);
  };

  return (
    <div className="vital-signs">
      <label>Dataset name: </label>
      <input value={dataSet} onChange={(e) => setDataSet(e.target.value)} />
      <button onClick={() => fetchData()}>Get data</button>
      {status === -1 && <h2>Enter desired dataset name</h2>}
      {status === 0 && <h2>Loading...</h2>}
      {status === 1 && <h2>No data</h2>}
      {status === 2 && (
        <div>
          <ul>
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
                disabled={!edit}
              ></input>
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
                disabled={!edit}
              ></input>
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
                disabled={!edit}
              ></input>
            </li>
          </ul>
          <button onClick={() => setEdit(true)} style={{ marginRight: 10 }}>
            Edit
          </button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      )}
    </div>
  );
}

export default VitalSigns;
