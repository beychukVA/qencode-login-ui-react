import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';
import { getInputType, getWidth } from '../../../utility/utils';
import { ShowIcon } from '../../icons/ShowIcon';
import styles from './Input.module.scss';
import { IType } from './types/IType';

interface IProps {
	placeholder?: string;
	label?: string;
	type: IType;
	value: string;
	anchor: string;
	textError?: string;
	icon?: ReactNode;
	onChange: (prop: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	pt?: number;
	pr?: number;
	pb?: number;
	pl?: number;
	mt?: number;
	mr?: number;
	mb?: number;
	ml?: number;
	width?: number | 'full-width' | 'fit-content';
	password?: string;
	editable?: boolean;
}

export const Input: React.FC<IProps> = ({
	value,
	onChange,
	anchor,
	type = 'text',
	placeholder = '',
	label = '',
	icon,
	pt = 14,
	pr = type === 'password' || type === 'passwordConfirm' ? 42 : 12,
	pb = 14,
	pl = 12,
	mt = 0,
	mr = 0,
	mb = 0,
	ml = 0,
	width = 'full-width',
	textError = '',
	password,
	editable = true,
}) => {
	const [isShow, setIsShow] = useState(false);

	const toggleShow = () => setIsShow(prev => !prev);

	return (
		<div
			style={{
				margin: `${mt}px ${mr}px ${mb}px ${ml}px`,
				width: getWidth(width),
			}}
			className={styles.container}
		>
			{label && (
				<label
					htmlFor='error-message'
					className={`${styles.label} ${textError ? styles.labelError : ''}`}
				>
					{label}
				</label>
			)}
			{icon && <div className={styles.icon}>{icon}</div>}
			<div className={styles.errorContainer}>
				<input
					style={{
						padding: `${pt}px ${pr}px ${pb}px ${icon ? 42 : pl}px`,
					}}
					className={clsx(
						styles.input,
						textError ? styles.inputError : '',
						editable ? '' : styles.disabled
					)}
					pattern=''
					placeholder={placeholder}
					type={isShow ? 'text' : getInputType(type)}
					value={value}
					onChange={e => {
						onChange(anchor)(e);
					}}
					disabled={!editable}
				/>
			</div>
			{(type === 'password' || type === 'passwordConfirm') && (
				<div className={styles.showIcon} onClick={toggleShow}>
					{<ShowIcon color={isShow ? '#316fea' : '#67717B'} />}
				</div>
			)}
			{textError && <span className={styles.textError}>{textError}</span>}
		</div>
	);
};
