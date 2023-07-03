import { useSelector } from "react-redux";
import { QueryEngine } from "@comunica/query-sparql";
import CreatDataset from "../Components/CreateDataset";
import { Drugs } from "../Components/Drugs";

const myEngine = new QueryEngine();
function Home() {
  const session = useSelector((state) => state.user);

  //test fetch directly
  const fetchData = async () => {
    const bindingsStream = await myEngine.queryBindings(
      `
        SELECT * WHERE {
            ?s ?p ?o
        } LIMIT 100`,
      {
        sources: ["https://tranbau.solidcommunity.net/test/observation"], // Sets your profile as query source
        "@comunica/actor-http-inrupt-solid-client-authn:session": session,
      }
    );

    // Consume results as a stream (best performance)
    bindingsStream.on("data", (binding) => {
      console.log(binding.toString()); // Quick way to print bindings for testing

      console.log(binding.has("s")); // Will be true

      // Obtaining values
      console.log(binding.get("s").value);
      console.log(binding.get("s").termType);
      console.log(binding.get("p").value);
      console.log(binding.get("o").value);
    });
    bindingsStream.on("end", () => {
      // The data-listener will not be called anymore once we get here.
    });
    bindingsStream.on("error", (error) => {
      console.error(error);
    });
  };

  return (
    <div>
      <button onClick={() => fetchData()}>Fetch directly</button>
      {/* {session.session.webId && <CreatDataset />} */}
      <Drugs/>
    </div>
  );
}
export default Home;
