import './App.css';
import Header from './components/Header/Header';
import Card from './components/Card/Card';
import Layout from './Layout/Layout';
import FilterAndAddListingAgent from './components/FilterAndAddListingAgent/FilterAndAddListingAgent'
import Listings from './components/Listings/Listings'
import AddListingPage from './pages/AddListingPage/AddListingPage'
import ListingPage from './pages/ListingPage/ListingPage'
import AddAgentPopup from './components/AddAgentPopup/AddAgentPopup'


function App() {
  return (
   <Layout>
    <Header></Header>
    <AddListingPage/>
   </Layout>
  );
}

export default App;
