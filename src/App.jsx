import Nav from "./pages/Nav";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <div className="flex h-screen w-screen bg-gray-700">
      <div className="w-80">
        {" "}
        <Nav />{" "}
      </div>
      <div className="flex-1 bg-[#F8F8F8] overflow-y-auto rounded-tl-md">
        {" "}
        <Outlet />
      </div>{" "}
    </div>
  );
};
export default App;
