import './App.css';
import Header from './components/Header/Header';
import Card from './components/Card/Card';
import Layout from './Layout/Layout';
import Filter from './components/Filter/Filter';
import FilterAndAddListingAgent from './components/FilterAndAddListingAgent/FilterAndAddListingAgent'


function App() {
  return (
   <Layout>
    <Header></Header>
    
   <FilterAndAddListingAgent></FilterAndAddListingAgent>
    <Card></Card>
   </Layout>
  );
}

export default App;
