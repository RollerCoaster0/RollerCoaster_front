import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./components/pages/homepage/HomePage";
import GamePage from "./components/pages/gamepage/GamePage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>,
    },
    {
        path: '/game/:sessionId',
        element: <GamePage/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

