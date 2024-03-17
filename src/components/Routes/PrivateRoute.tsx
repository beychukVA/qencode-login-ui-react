import { compareAsc } from 'date-fns';
import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

interface IProps {
	children?: ReactNode;
	redirectTo?: string;
}

export const PrivateRoute: React.FC<IProps> = ({
	children,
	redirectTo = '/onboarding',
}) => {
	const token = useStore((state: any): string => state.token);
	const tokenExpire = useStore((state: any): string => state.tokenExpire);
	const setToken = useStore((state: any) => state.setToken);
	const setTokenExpire = useStore((state: any) => state.setTokenExpire);
	const navigate = useNavigate();
	const valid = compareAsc(new Date(), new Date(tokenExpire));
	const shouldRedirect = !token || valid === -1;

	useEffect(() => {
		if (shouldRedirect) {
			setToken('');
			setTokenExpire('');
			navigate(redirectTo);
		}
	}, [
		token,
		valid,
		redirectTo,
		shouldRedirect,
		navigate,
		setToken,
		setTokenExpire,
	]);

	return shouldRedirect ? null : <>{children}</>;
};
