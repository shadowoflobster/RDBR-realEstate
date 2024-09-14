import './App.css';
import Header from './components/Header/Header';
import Card from './components/Card/Card';
import Layout from './Layout/Layout';
import Filter from './components/Filter/Filter';


function App() {
  return (
   <Layout>
    <Header></Header>
    <Filter></Filter>
    <Card></Card>
   </Layout>
  );
}

export default App;
