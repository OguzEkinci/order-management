import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
const App = ({ routes }) => {
  return (
    <Layout routes={routes}>
      <Home />
    </Layout>
  );
};
export default App;
