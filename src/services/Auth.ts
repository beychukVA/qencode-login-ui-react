import axios from '../axios/axios';

export const Login = async (email: string, password: string) => {
	return axios.post('auth/login ', {
		email,
		password,
	});
};

export const Signup = async (email: string, password: string) => {
	return axios.post('auth/sign-up ', {
		email,
		password,
	});
};

export const ResetPassword = async (email: string) => {
	return axios.post('auth/password-reset', {
		email,
	});
};

export const SetNewPassword = async (
	token: string,
	secret: string,
	password: string
) => {
	return axios.post('auth/password-set', {
		token,
		secret,
		password,
	});
};

export const VerifyAccessToken = async (token: string) => {
	return axios.post('auth//access-token	', null, {
		headers: { Authorization: `Bearer ${token}` },
	});
};
