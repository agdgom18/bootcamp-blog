import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './page/Home';
import './scss/style.scss';
import React, { createContext } from 'react';
import PrivateRoutes from './utils/PrivateRoutes';
import AddBlog from './page/AddBlog/AddBlog';
import { useLocation } from 'react-router-dom';
import Blog from './page/Blog';
import Cookies from 'js-cookie';

export const Context = createContext();

function App() {
  // checking path to show header

  const currentPath = useLocation().pathname;
  const shouldDisplayHeader = currentPath !== '/add';

  const [signedIn, setSignedIn] = React.useState(Boolean(Cookies.get('signedIn')));
  return (
    <>
      <Context.Provider value={[signedIn, setSignedIn]}>
        {shouldDisplayHeader && <Header />}
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/post/:id" element={<Blog />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/add" element={<AddBlog />} />
          </Route>
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
