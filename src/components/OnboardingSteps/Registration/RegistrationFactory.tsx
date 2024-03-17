import { RegistrationStepsEnum } from '../lib/RegistrationStepsEnum';
import { RegistrationEmailStep } from './Steps/RegistrationEmailStep';
import { IStepProps } from './types/IRegistration';

class RegistrationComponentsFactory {
	list = {
		[RegistrationStepsEnum.REGISTRATION_EMAIL]: RegistrationEmailStep,
	};

	getComponent({
		step,
		setStep,
		data,
		setData,
		handleChangeMenu,
		menu,
	}: IStepProps) {
		const Component = this.list[step];

		if (Component) {
			return (
				<Component
					{...{
						step,
						setStep,
						data,
						setData,
						handleChangeMenu,
						menu,
					}}
				/>
			);
		}

		return null;
	}
}

export const registrationComponentsFactory =
	new RegistrationComponentsFactory();
