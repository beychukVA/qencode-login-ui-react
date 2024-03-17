import React, { useState } from 'react';
import { z } from 'zod';
import { ResetPassword } from '../../../../services/Auth';
import { getErrorMessage } from '../../../../utility/utils';
import { Error } from '../../../Error/Error';
import { Button } from '../../../common/Button/Button';
import { Input } from '../../../common/Input/Input';
import { Title } from '../../../common/Title/Title';
import { LoginStepsEnum } from '../../lib/LoginStepsEnum';
import { IDate, IStepProps } from '../types/ILogin';
import styles from './LoginForgotPasswordStep.module.scss';

const loginForgotPasswordFormSchema = z.object({
	email: z.string().email('Incorrect email'),
});

export const LoginForgotPasswordStep: React.FC<IStepProps> = ({
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
		token: data.token,
		newPassword: data.newPassword,
		confirmNewPassword: data.confirmNewPassword,
		secret: data.secret,
	});
	const [errors, setErrors] = useState<
		z.ZodFormattedError<
			{
				email: string;
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

	const handleForgotPassword = async () => {
		const validationLoginForm = loginForgotPasswordFormSchema.safeParse({
			email: values.email,
		});
		if (!validationLoginForm.success) {
			const loginFormErros = validationLoginForm.error.format();
			setErrors(loginFormErros);
		} else {
			setErrors({ _errors: [] });
			setServerErrors({ _errors: [] });
			await ResetPassword(values.email)
				.then(res => {
					//TODO: Get secret code
					setStep(LoginStepsEnum.LOGIN_NEW_PASSWORD);
				})
				.catch((error: any) => {
					setServerErrors({
						_errors: [getErrorMessage(error)],
					});
				});
		}
	};
	const handleCancel = () => setStep(LoginStepsEnum.LOGIN_EMAIL);

	return (
		<div className={styles.container}>
			<Title>Forgot Password?</Title>
			<Input
				mt={40}
				type='email'
				placeholder='Enter your email'
				textError={errors.email?._errors.join(', ')}
				value={values.email}
				anchor='email'
				onChange={handleChange}
			/>
			<Button mt={25} mb={20} onClick={handleForgotPassword}>
				Send
			</Button>
			<Button variant='white' onClick={handleCancel}>
				Cancel
			</Button>
			{serverErrors._errors[0] && (
				<Error>{serverErrors._errors.join(', ')}</Error>
			)}
		</div>
	);
};
