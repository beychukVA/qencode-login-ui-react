import { IOnboardingMenu } from '../../../OnboardingMenu/IOnboardingMenu';

export interface IDate {
	email: string;
	password: string;
}

export interface IStepProps {
	handleChangeMenu: (itemMenu: string) => void;
	menu: IOnboardingMenu;
	step: string;
	setStep: (step: string) => void;
	data: IDate;
	setData: (data: React.SetStateAction<IDate>) => void;
}
