import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../../pages/Home/Home';
import { Onboarding } from '../../pages/Onboarding/Onboarding';
import { PrivateRoute } from '../Routes/PrivateRoute';
import { PublicRoute } from '../Routes/PublicRoute';

export const BrowserRouter = createBrowserRouter([
	{
		path: '/',
		element: (
			<PrivateRoute>
				<Home />
			</PrivateRoute>
		),
	},
	{
		path: '/onboarding',
		element: (
			<PublicRoute restricted>
				<Onboarding />
			</PublicRoute>
		),
	},
]);
