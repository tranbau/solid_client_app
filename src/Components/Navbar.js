function Navbar({ setOption }) {
  return (
    <div className="navbar">
      <div
        className="options"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "25%",
        }}
      >
        <div>
          <button onClick={() => setOption(1)}>Show template</button>
        </div>
        <div>
          <button onClick={() => setOption(2)}>Show vital signs</button>
        </div>
        <div>
          <button onClick={() => setOption(3)}>Create New Dataset</button>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
