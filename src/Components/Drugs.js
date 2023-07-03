import { useState } from "react";
import { useSelector } from "react-redux";

function CreateDrug({ session }) {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //send post request
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("session", JSON.stringify({ session: session }));
    fetch("http://localhost:3001/drugs", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ drugInfor: inputs }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Có lỗi từ server.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Dữ liệu phản hồi từ server
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <h1>Create New Drug</h1>
      <form onSubmit={handleSubmit}>
        <label>
          drugName
          <input
            type="text"
            name="drugName"
            value={inputs.drugName || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          registerCode
          <input
            type="text"
            name="registerCode"
            value={inputs.registerCode || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          apothecapy
          <input
            type="text"
            name="apothecapy"
            value={inputs.apothecapy || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          registerCompany
          <input
            type="text"
            name="registerCompany"
            value={inputs.registerCompany || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
function GetDrugs({ session }) {
  //send get request
  const sendRequest = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("session", JSON.stringify({ session: session }));

    fetch("http://localhost:3001/drugs", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Có lỗi từ server.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Dữ liệu phản hồi từ server
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <h1>Get all drugs</h1>
      <button onClick={() => sendRequest()}>Send request</button>
    </div>
  );
}

function GetDrugById({ session }) {
    const [id, setId] = useState('1');

    const sendRequest = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("session", JSON.stringify({ session: session }));
    
        fetch(`http://localhost:3001/drugs/${id}`, {
          method: "GET",
          headers: myHeaders,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Có lỗi từ server.");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data); // Dữ liệu phản hồi từ server
          })
          .catch((error) => {
            console.error(error);
          });
      };
      return (
        <div>
          <h1>Get all drugs</h1>
          <label>
            <input value={id} onChange={(e) => setId(e.target.value)}/>
          </label>
          <button onClick={() => sendRequest()}>Send request</button>
        </div>
      );
}
function UpdateDrug() {}
function DeleteDrug() {}

export function Drugs() {
  const [option, setOption] = useState(1);

  const session = useSelector((state) => state.user);

  const options = [
    { value: 1, item: <CreateDrug session={session} /> },
    { value: 2, item: <GetDrugs session={session} /> },
    { value: 3, item: <GetDrugById session={session} /> },
    { value: 4, item: <UpdateDrug session={session} /> },
    { value: 5, item: <DeleteDrug session={session} /> },
  ];

  const chosenOption = () => {
    return options.find((e) => e.value === option).item;
  };

  return (
    <>
      <ul>
        <li>
          <button onClick={() => setOption(1)}>CreateDrug</button>
        </li>
        <li>
          <button onClick={() => setOption(2)}>GetDrugs</button>
        </li>
        <li>
          <button onClick={() => setOption(3)}>GetDrugById</button>
        </li>
        <li>
          <button onClick={() => setOption(4)}>UpdateDrug</button>
        </li>
        <li>
          <button onClick={() => setOption(5)}>DeleteDrug</button>
        </li>
      </ul>
      {chosenOption()}
    </>
  );
}
