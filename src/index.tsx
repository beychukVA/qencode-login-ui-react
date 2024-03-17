import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { BrowserRouter } from './components/BrowserRouter/BrowserRouter';
import './styles/sass/main.scss';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<RouterProvider router={BrowserRouter} />
	</React.StrictMode>
);
