import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import LayaoutOne from './Layaouts/layaoutOne/LayaoutOne';
import Bin from './pages/Bin/Bin';
import Pin from './pages/Pin/Pin';
import Landing from './components/Landing page/Landing'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './pages/Home/Home';

function App() {
  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Login and Register Routes */}
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />

        {/* Main Layout */}
        <Route path="/home" element={<LayaoutOne />}>
          <Route index element={<Home/>} />
          <Route path="Bin" element={<Bin />} />
          <Route path="Pin" element={<Pin />} />
        </Route>
      </>
    )
  );

  return (
    <RouterProvider router={myRoute} />
  );
}

export default App;
