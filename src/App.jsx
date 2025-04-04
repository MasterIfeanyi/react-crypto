import { Route, Routes } from 'react-router-dom';
import Coins from './features/coins/Coins';
import Layout from './Layout/Layout';
import SplashScreen from './components/SplashScreen/SplashScreen';
import MissingRoute from './utils/MissingRoute';



function App() {


  return (
    <Layout>
      <Routes>
        <Route path='/' element={<SplashScreen />} />
        <Route path='/coin' element={<Coins />} />
        <Route path="*" element={<MissingRoute />} />
      </Routes>
    </Layout>
  );
}

export default App;
