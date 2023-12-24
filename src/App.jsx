import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './page/Home';
import './scss/style.scss';
import Blog from './page/Blog';
import React, { createContext } from 'react';
import PrivateRoutes from './utils/PrivateRoutes';
import AddBlog from './page/AddBlog/AddBlog';

export const Context = createContext();

function App() {
  const [signedIn, setSignedIn] = React.useState(false);
  return (
    <>
      <Context.Provider value={[signedIn, setSignedIn]}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route element={<PrivateRoutes />}>
            <Route path="/add" element={<AddBlog />} />
          </Route>
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
