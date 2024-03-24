import React from 'react';
import { Route, Routes as Routings } from "react-router-dom";
import { PublicRoutes } from "./routes/AppRoutes";

import './App.scss';

interface ContractsProps {
  id: string;
  kupac: string;
  broj_ugovora: string;
  datum_akontacije: any;
  rok_isporuke?: any;
  status: string;
}

function App() {

  return (
    <div className="App">
     <Routings>
        {PublicRoutes.map((r) => (
          <Route element={r.element} key={r.path} path={r.path} />
        ))}
      </Routings>
    </div>
  );
}

export default App;
