import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Coins from './features/coins/Coins';
import Layout from './Layout/Layout';
import SplashScreen from './components/SplashScreen';


function App() {

  <main className="App">
      <Header />
      <Coins />
      <Footer />
    </main>


  return (
    <Layout>
      <Routes>
        <Route path='/' element={<SplashScreen />} />
        <Route path="/" />
        
      </Routes>
    </Layout>
  );
}

export default App;
