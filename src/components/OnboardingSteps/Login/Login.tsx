import React, { useState } from 'react';
import { Logo } from '../../Logo/Logo';
import { IOnboardingMenu } from '../../OnboardingMenu/IOnboardingMenu';
import { LoginStepsEnum } from '../lib/LoginStepsEnum';
import styles from './Login.module.scss';
import { loginComponentsFactory } from './LoginFactory';
import { IDate } from './types/ILogin';

interface IProps {
	handleChangeMenu: (itemMenu: string) => void;
	menu: IOnboardingMenu;
}

export const Login: React.FC<IProps> = ({ handleChangeMenu, menu }) => {
	const [step, setStep] = useState<string>(LoginStepsEnum.LOGIN_EMAIL);
	const [data, setData] = useState<IDate>({
		email: '',
		password: '',
		token: '',
		newPassword: '',
		confirmNewPassword: '',
		secret: 'secret code', //TODO: for testing
	});

	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<Logo />
			</div>
			{loginComponentsFactory.getComponent({
				handleChangeMenu,
				menu,
				step,
				data,
				setData,
				setStep,
			})}
		</div>
	);
};
