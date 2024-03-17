import React, { useState } from 'react';
import { z } from 'zod';
import { Signup } from '../../../../services/Auth';
import { getErrorMessage } from '../../../../utility/utils';
import { Error } from '../../../Error/Error';
import { Button } from '../../../common/Button/Button';
import { Input } from '../../../common/Input/Input';
import { Title } from '../../../common/Title/Title';
import { TransparentButton } from '../../../common/TransparentButton/TransparentButton';
import { IDate, IStepProps } from '../types/IRegistration';
import styles from './RegistrationEmailStep.module.scss';

const signupFormSchema = z.object({
	email: z
		.string()
		.min(15, 'Should be at least 15 characters long')
		.email('Incorrect email'),
	password: z.string().min(8, 'Should be at least 8 characters long'),
});

export const RegistrationEmailStep: React.FC<IStepProps> = ({
	step,
	setStep,
	data,
	setData,
	handleChangeMenu,
	menu,
}) => {
	const [values, setValues] = useState<IDate>({
		email: data.email,
		password: data.password,
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

	const handleLogin = () => handleChangeMenu(menu.MENU_LOGIN);
	const handleSignup = async () => {
		const validationSignupForm = signupFormSchema.safeParse({
			email: values.email,
			password: values.password,
		});
		if (!validationSignupForm.success) {
			const loginFormErros = validationSignupForm.error.format();
			setErrors(loginFormErros);
		} else {
			setErrors({ _errors: [] });
			setServerErrors({ _errors: [] });
			await Signup(values.email, values.password)
				.then(res => {
					//TODO: Process the response from the server
				})
				.catch((error: any) => {
					setServerErrors({
						_errors: [getErrorMessage(error)],
					});
				});
		}
	};

	return (
		<div className={styles.container}>
			<Title>Register an account?</Title>
			<div className={styles.inputsContainer}>
				<Input
					type='email'
					placeholder='Work email'
					textError={errors.email?._errors.join(', ')}
					value={values.email}
					anchor='email'
					onChange={handleChange}
				/>
				<Input
					mt={25}
					type='password'
					placeholder='Password'
					textError={errors.password?._errors.join(', ')}
					value={values.password}
					anchor='password'
					onChange={handleChange}
				/>
			</div>
			<Button mt={25} mb={20} onClick={handleSignup}>
				Sign up
			</Button>
			<div className={styles.login}>
				<span className={styles.text}>Already have an account?</span>
				&nbsp;
				<TransparentButton
					color='accent'
					width='fit-content'
					onClick={handleLogin}
				>
					Login
				</TransparentButton>
			</div>
			{serverErrors._errors[0] && (
				<Error>{serverErrors._errors.join(', ')}</Error>
			)}
		</div>
	);
};
