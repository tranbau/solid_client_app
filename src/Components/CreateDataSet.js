import { useSelector } from "react-redux";
import { createSolidDataset, saveSolidDatasetAt } from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";

function CreatDataset() {
  const webId = useSelector((state) => state.user.session.webId);

  //console.log(webId);
  const baseURl = new URL(webId).origin;

  const handleCreate = async () => {
    let solidDataset = createSolidDataset();
    await saveSolidDatasetAt(
      `${baseURl}/vaipe/drugs`,
      solidDataset,
      { fetch: fetch } // fetch from authenticated Session
    )
      .then((result) => console.log("Done"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <button onClick={() => handleCreate()}>Create DrugDataset</button>
    </div>
  );
}
export default CreatDataset;
