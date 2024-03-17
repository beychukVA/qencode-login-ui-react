import React, { useState } from 'react';
import { OnboardingLayout } from '../../components/Layouts/OnboardingLayout/OnboardingLayout';
import { IOnboardingMenu } from '../../components/OnboardingMenu/IOnboardingMenu';
import { Login } from '../../components/OnboardingSteps/Login/Login';
import { Registration } from '../../components/OnboardingSteps/Registration/Registration';

interface IProps {}

const menu: IOnboardingMenu = {
	MENU_REGISTRATION: 'menu_registration',
	MENU_LOGIN: 'menu_login',
};

export const Onboarding: React.FC<IProps> = () => {
	const [selectedMenu, setSelectedMenu] = useState<string | null>(
		menu.MENU_LOGIN
	);
	const handleChangeMenu = (menuItem: string) => setSelectedMenu(menuItem);

	return (
		<OnboardingLayout>
			{selectedMenu === menu.MENU_REGISTRATION && (
				<Registration handleChangeMenu={handleChangeMenu} menu={menu} />
			)}
			{selectedMenu === menu.MENU_LOGIN && (
				<Login handleChangeMenu={handleChangeMenu} menu={menu} />
			)}
		</OnboardingLayout>
	);
};
