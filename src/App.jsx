import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './page/Home';
import './scss/style.scss';
import Blog from './page/Blog';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </>
  );
}

export default App;
