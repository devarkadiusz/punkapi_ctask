import React, { FunctionComponent, useEffect, useState } from 'react';
import './App.sass';
import { Auth } from './components/Account/Auth/Auth';
import { BeerList } from './components/Beers/BeerList';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const App: FunctionComponent = () => {
  const [authed, setAuthed] = useState<boolean>(false);
  useEffect(() => {
    let token = localStorage.getItem('token');
    if(token && token.length > 0) setAuthed(true);
    else setAuthed(false);
  });
  return <main>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={authed ? <Navigate replace to="/beerlist" /> : <Auth />} />
          <Route path="/beerlist" element={<BeerList />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <span className='grupavist_logo'><img alt='grupavist_logo' src='https://cdn.bulldogjob.com/system/companies/logos/000/002/814/thumb/Group_26.png' /></span>
  </main>;
};

export default App;
