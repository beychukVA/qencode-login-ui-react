import React, { useState } from 'react';
import { z } from 'zod';
import { Login } from '../../../../services/Auth';
import { useStore } from '../../../../store/useStore';
import { getErrorMessage } from '../../../../utility/utils';
import { Divider } from '../../../Divider/Divider';
import { Error } from '../../../Error/Error';
import { Button } from '../../../common/Button/Button';
import { Input } from '../../../common/Input/Input';
import { Title } from '../../../common/Title/Title';
import { TransparentButton } from '../../../common/TransparentButton/TransparentButton';
import { GithubIcon } from '../../../icons/GithubIcon';
import { GoogleIcon } from '../../../icons/GoogleIcon';
import { LoginStepsEnum } from '../../lib/LoginStepsEnum';
import { IDate, IStepProps } from '../types/ILogin';
import styles from './LoginEmailStep.module.scss';

const loginFormSchema = z.object({
	email: z
		.string()
		.min(15, 'Should be at least 15 characters long')
		.email('Incorrect email'),
	password: z
		.string()
		.min(8)
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/, {
			message:
				'Should be at least 8 characters long, contain at least one numeric, one uppercase letter and one lowercase letter',
		}),
});

export const LoginEmailStep: React.FC<IStepProps> = ({
	step,
	setStep,
	data,
	setData,
	handleChangeMenu,
	menu,
}) => {
	const setToken = useStore((state: any) => state.setToken);
	const setTokenExpire = useStore((state: any) => state.setTokenExpire);
	const [values, setValues] = useState<IDate>({
		email: data.email,
		password: data.password,
		token: data.token,
		newPassword: data.newPassword,
		confirmNewPassword: data.confirmNewPassword,
		secret: data.secret,
	});
	const [errors, setErrors] = useState<
		z.ZodFormattedError<
			{
				email: string;
				password: string;
			},
			string
		>
	>({ _errors: [] });
	const [serverErrors, setServerErrors] = useState<{
		_errors: string[];
	}>({ _errors: [] });

	const handleChange =
		(prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setErrors({ _errors: [] });
			setServerErrors({ _errors: [] });
			setValues({ ...values, [prop]: event.target.value });
			setData(prev => ({
				...prev,
				[prop]: event.target.value,
			}));
		};

	const handleLogin = async () => {
		const validationLoginForm = loginFormSchema.safeParse({
			email: values.email,
			password: values.password,
		});
		if (!validationLoginForm.success) {
			const loginFormErros = validationLoginForm.error.format();
			setErrors(loginFormErros);
		} else {
			setErrors({ _errors: [] });
			setServerErrors({ _errors: [] });
			await Login(values.email, values.password)
				.then(res => {
					if (res.status === 200) {
						setToken(res?.data?.access_token);
						setTokenExpire(res?.data?.token_expire);
					}
				})
				.catch((error: any) => {
					setServerErrors({
						_errors: [getErrorMessage(error)],
					});
				});
		}
	};

	const handleSignUp = () => handleChangeMenu(menu.MENU_REGISTRATION);
	const handleForgotPassword = () =>
		setStep(LoginStepsEnum.LOGIN_FORGOT_PASSWORD);

	const handleGoogleLogin = () => {};
	const handleGithubLogin = () => {};

	return (
		<div className={styles.container}>
			<Title>Log in to your account</Title>
			<div className={styles.socialButtonsContainer}>
				<Button
					variant='white'
					icon={<GoogleIcon />}
					mr={16}
					pt={14}
					pb={14}
					onClick={handleGoogleLogin}
				>
					Google
				</Button>
				<Button
					variant='white'
					icon={<GithubIcon />}
					pt={14}
					pb={14}
					onClick={handleGithubLogin}
				>
					Github
				</Button>
			</div>
			<Divider />
			<Input
				type='email'
				placeholder='Work email'
				textError={errors.email?._errors.join(', ')}
				value={values.email}
				anchor='email'
				onChange={handleChange}
			/>
			{values.email && (
				<>
					<Input
						mt={25}
						type='password'
						placeholder='Password'
						textError={errors.password?._errors.join(', ')}
						value={values.password}
						anchor='password'
						onChange={handleChange}
					/>
					<div className={styles.linkContainer}>
						<TransparentButton
							color='accent'
							width='fit-content'
							onClick={handleForgotPassword}
						>
							Forgot your password?
						</TransparentButton>
					</div>
				</>
			)}
			<Button mt={30} mb={20} onClick={handleLogin}>
				Log in to Qencode
			</Button>
			<div className={styles.signup}>
				<span className={styles.text}>Is your company new to Qencode?</span>
				&nbsp;
				<TransparentButton
					color='accent'
					width='fit-content'
					onClick={handleSignUp}
				>
					Sign up
				</TransparentButton>
			</div>
			{serverErrors._errors[0] && (
				<Error>{serverErrors._errors.join(', ')}</Error>
			)}
		</div>
	);
};
