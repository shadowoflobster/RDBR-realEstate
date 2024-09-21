import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './Layout/Layout';
import FilterAndAddListingAgent from './components/FilterAndAddListingAgent/FilterAndAddListingAgent';
import Listings from './components/Listings/Listings';
import AddListingPage from './pages/AddListingPage/AddListingPage';

function App() {
  const location = useLocation();

  return (
    <>
    <Header />
    <Layout>
      {/* Conditionally render the FilterAndAddListingAgent based on the current route */}
      {location.pathname !== '/addlisting' && <FilterAndAddListingAgent />}
      <Routes>
        <Route path="/addlisting" element={<AddListingPage />} />
        <Route path="/" element={<Listings />} /> {/* Default route */}
      </Routes>
    </Layout></>
  );
}

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
