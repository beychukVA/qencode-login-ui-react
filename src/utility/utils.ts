import { IType } from '../components/common/Input/types/IType';

export const getWidth = (width: number | 'full-width' | 'fit-content') => {
	if (width === 'full-width') {
		return '100%';
	}

	return width === 'fit-content' ? 'fit-content' : `${width}px`;
};

export const getInputType = (type: IType) => {
	if (type === 'tel') {
		return 'text';
	}

	return type === 'passwordConfirm' ? 'password' : type;
};

export const getErrorMessage = (error: any): string => {
	if (!error) return '';

	return `
	${
		error?.response?.data?.detail[0]?.field_name
			? error?.response?.data?.detail[0]?.field_name + ': '
			: ''
	} 	
	${
		error?.response?.data?.detail[0]?.error ||
		error?.response?.data?.detail ||
		''
	}
	`;
};
