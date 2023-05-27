import ReactJson from "react-json-view";
import { Observation_object_template } from "../fhirTemplates/Observation";

import { Medication_object_template } from "../fhirTemplates/Drug/Medication";
import { MedicationKnowledge_object_template } from "../fhirTemplates/Drug/MedicationKnowledge";

import { MedicationAdministration_object_template } from "../fhirTemplates/MedicationAdministration";
import { ClinicalImpression_object_template } from "../fhirTemplates/ClinicalImpression";
import { DiagnosticReport_object_template } from "../fhirTemplates/DiagnosticReport";

import { MedicationRequest_object_template } from "../fhirTemplates/MedicationRequest";
import { MedicationStatement_object_template } from "../fhirTemplates/MedicationStatement";
import { useState } from "react";

//import Images
import Weight from "../Assets/Images/Weight.PNG";
import User from "../Assets/Images/User.PNG";
import Drugs from "../Assets/Images/Drugs.PNG";
import DrugTakenInfors from "../Assets/Images/DrugTakenInfors.PNG";
import MedicineSchedule from "../Assets/Images/MedicineSchedules.PNG";

const User_object_template = {
  email: "xyz@gmail.com",
  birthday: "02-02-2020",
  gender: "Male",
  img: "avatar",
  startDate: "03-03-2023",
  dateModified: "04-04-2023"
};

function SQLTable({ img }) {
  return (
    <div>
      <img src={img} alt="sql table" />
    </div>
  );
}

function Template({ template }) {
  const [option, setOption] = useState("");
  const [objects, setObjects] = useState([]);
  const [img, setImg] = useState("");

  const options = [
    {
      value: "user",
      label: "User",
      objects: [User_object_template],
      img: User,
    },
    {
      value: "vitalSigns",
      label: "Vital Signs",
      objects: [Observation_object_template],
      img: Weight,
    },
    {
      value: "drugs",
      label: "Drugs",
      objects: [
        MedicationKnowledge_object_template,
        Medication_object_template,
      ],
      img: Drugs,
    },
    {
      value: "medicineSchedule",
      label: "Medicine Schedules",
      objects: [
        MedicationAdministration_object_template,
        ClinicalImpression_object_template,
        DiagnosticReport_object_template,
      ],
      img: MedicineSchedule,
    },
    {
      value: "drugTakenInfors",
      label: "Taken drugs'information",
      objects: [
        MedicationRequest_object_template,
        MedicationStatement_object_template,
      ],
      img: DrugTakenInfors,
    },
  ];

  const handleOption = (optionValue) => {
    setOption(optionValue);
    for (let option of options) {
      if (option.value === optionValue) {
        setObjects(option.objects);
        setImg(option.img);
        break;
      }
    }
  };

  return (
    <div>
      <select value={option} onChange={(e) => handleOption(e.target.value)}>
        {options.map((option, index) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {option && (
          <div>
            {objects.map((object, index) => (
              <div>
                <h3>{index + 1}</h3>
                <ReactJson
                  src={object}
                  key={index}
                  displayObjectSize={false}
                  displayArrayKey={false}
                  quotesOnKeys={false}
                  collapsed = {1}
                />
              </div>
            ))}
          </div>
        )}
        <div>{img && <SQLTable img={img} />}</div>
      </div>
    </div>
  );
}

export default Template;
