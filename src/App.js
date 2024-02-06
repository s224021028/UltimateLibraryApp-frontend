import Header from "./components/header/header";
import CenteredTabs from "./components/tabs/tabs";
import useGetBooks from "./hooks/useGetBooks";

function App() {
  useGetBooks();

  return (
    <div className="App">
      <Header />
      {/* <CenteredTabs /> */}
    </div>
  );
}

export default App;
