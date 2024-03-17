import React, { useState } from 'react';
import { z } from 'zod';
import { SetNewPassword } from '../../../../services/Auth';
import { useStore } from '../../../../store/useStore';
import { getErrorMessage } from '../../../../utility/utils';
import { Error } from '../../../Error/Error';
import { Button } from '../../../common/Button/Button';
import { Input } from '../../../common/Input/Input';
import { Title } from '../../../common/Title/Title';
import { LoginStepsEnum } from '../../lib/LoginStepsEnum';
import { IDate, IStepProps } from '../types/ILogin';
import styles from './LoginNewPasswordStep.module.scss';

const loginNewPasswordFormSchema = z.object({
	newPassword: z
		.string()
		.min(8)
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/, {
			message:
				'Should be at least 8 characters long, contain at least one numeric, one uppercase letter and one lowercase letter',
		}),
	confirmNewPassword: z
		.string()
		.min(8)
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/, {
			message:
				'Should be at least 8 characters long, contain at least one numeric, one uppercase letter and one lowercase letter',
		}),
});

export const LoginNewPasswordStep: React.FC<IStepProps> = ({
	step,
	setStep,
	data,
	setData,
	handleChangeMenu,
	menu,
}) => {
	const token = useStore((state: any) => state.token);
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
				newPassword: string;
				confirmNewPassword: string;
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

	const handleResetPassword = async () => {
		const validationLoginForm = loginNewPasswordFormSchema.safeParse({
			newPassword: values.newPassword,
			confirmNewPassword: values.confirmNewPassword,
		});
		if (!validationLoginForm.success) {
			const loginFormErros = validationLoginForm.error.format();
			setErrors(loginFormErros);
		} else {
			if (values.newPassword !== values.confirmNewPassword) {
				setErrors({
					...errors,
					confirmNewPassword: {
						_errors: ['Password mismatch'],
					},
				});
				return;
			}
			setErrors({ _errors: [] });
			setServerErrors({ _errors: [] });
			await SetNewPassword(token, values.secret, values.newPassword)
				.then(res => {
					setToken('');
					setTokenExpire('');
					setStep(LoginStepsEnum.LOGIN_EMAIL);
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
			<Title>Create new Password?</Title>
			<Input
				mt={77}
				label='Password'
				type='password'
				placeholder='Password'
				textError={errors.newPassword?._errors.join(', ')}
				value={values.newPassword}
				anchor='newPassword'
				onChange={handleChange}
			/>
			<Input
				mt={62}
				label='Confirm Password'
				password={values.newPassword}
				type='passwordConfirm'
				placeholder='Password'
				textError={errors.confirmNewPassword?._errors.join(', ')}
				value={values.confirmNewPassword}
				anchor='confirmNewPassword'
				onChange={handleChange}
			/>
			<Button mt={25} mb={20} onClick={handleResetPassword}>
				Reset Password
			</Button>
			{serverErrors._errors[0] && (
				<Error>{serverErrors._errors.join(', ')}</Error>
			)}
		</div>
	);
};
