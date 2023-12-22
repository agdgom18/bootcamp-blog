import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './page/Home';
import './scss/style.scss';
import Blog from './page/Blog';
import React, { createContext } from 'react';

export const Context = createContext();

function App() {
  const [signedIn, setSignedIn] = React.useState(false);
  return (
    <>
      <Context.Provider value={[signedIn, setSignedIn]}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
