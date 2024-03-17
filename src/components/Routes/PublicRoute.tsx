// import { useGetCurrentUserQuery } from '@/redux/Auth/auth-slice';
// import { useAppSelector } from '@/redux/store';
// import { compareAsc } from 'date-fns';
// import { useRouter } from 'next/router';
import { compareAsc } from 'date-fns';
import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

interface IProps {
	children?: ReactNode;
	redirectTo?: string;
	restricted: boolean;
}

export const PublicRoute: React.FC<IProps> = ({
	children,
	redirectTo = '/',
	restricted = false,
}) => {
	const token = useStore((state: any): string => state.token);
	const tokenExpire = useStore((state: any): string => state.tokenExpire);
	const navigate = useNavigate();
	const valid = compareAsc(new Date(), new Date(tokenExpire));
	const shouldRedirect = token && valid === 1 && restricted;

	useEffect(() => {
		if (shouldRedirect) {
			navigate(redirectTo);
		}
	}, [navigate, redirectTo, shouldRedirect]);

	return shouldRedirect ? null : <>{children}</>;
};
