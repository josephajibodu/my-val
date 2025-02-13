// import { useStep } from "./hooks/useStep";

import Authentication from "./components/main/authentication";

function App() {
  // const [] = useStep(10);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-2xl text-white bg-gradient-to-r from-pink-400 to-pink-300">
      <h1>Be my Val</h1>

      <Authentication />
    </div>
  );
}

export default App;
