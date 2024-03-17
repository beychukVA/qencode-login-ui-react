import React, { useState } from 'react';
import { Logo } from '../../Logo/Logo';
import { IOnboardingMenu } from '../../OnboardingMenu/IOnboardingMenu';
import { RegistrationStepsEnum } from '../lib/RegistrationStepsEnum';
import styles from './Registration.module.scss';
import { registrationComponentsFactory } from './RegistrationFactory';
import { IDate } from './types/IRegistration';

interface IProps {
	handleChangeMenu: (itemMenu: string) => void;
	menu: IOnboardingMenu;
}

export const Registration: React.FC<IProps> = ({ handleChangeMenu, menu }) => {
	const [step, setStep] = useState<string>(
		RegistrationStepsEnum.REGISTRATION_EMAIL
	);
	const [data, setData] = useState<IDate>({
		email: '',
		password: '',
	});

	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<Logo />
			</div>
			{registrationComponentsFactory.getComponent({
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
