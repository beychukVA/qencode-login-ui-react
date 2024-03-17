import { LoginStepsEnum } from '../lib/LoginStepsEnum';
import { LoginEmailStep } from './Steps/LoginEmailStep';
import { LoginForgotPasswordStep } from './Steps/LoginForgotPasswordStep';
import { LoginNewPasswordStep } from './Steps/LoginNewPasswordStep';
import { IStepProps } from './types/ILogin';

class LoginComponentsFactory {
	list = {
		[LoginStepsEnum.LOGIN_EMAIL]: LoginEmailStep,
		[LoginStepsEnum.LOGIN_FORGOT_PASSWORD]: LoginForgotPasswordStep,
		[LoginStepsEnum.LOGIN_NEW_PASSWORD]: LoginNewPasswordStep,
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

export const loginComponentsFactory = new LoginComponentsFactory();
