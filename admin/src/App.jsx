import "./App.css";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <main className="bg-primary text-tertiary">
        <Navbar />
        <Admin />
      </main>
    </>
  );
}

export default App;
