import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import Template from "../Components/Template";
import VitalSigns from "../Components/ShowInfor";
import CreatDataset from "../Components/CreateDataSet";
function Home() {
  const webId = useSelector((state) => state.user.webId );
  console.log(webId)
  const [option, setOption] = useState(0);
  const getOption = () => {
    if (option === 1) return <Template />;
    else if (option === 2) return <VitalSigns />;
    else if (option === 3) return <CreatDataset />;
    else return <div></div>;
  };
  return (
    <div>
      {webId && (
        <div>
          <Navbar option={option} setOption={setOption} />
          {getOption()}
        </div>
      )}
    </div>
  );
}
export default Home;
