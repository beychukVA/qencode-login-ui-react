import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { getWidth } from '../../../utility/utils';
import styles from './Button.module.scss';

interface IProps {
	children?: string | ReactNode;
	variant?: 'white' | 'blue';
	onClick: () => void;
	icon?: ReactNode;
	pt?: number;
	pr?: number;
	pb?: number;
	pl?: number;
	mt?: number;
	mr?: number;
	mb?: number;
	ml?: number;
	width?: number | 'full-width' | 'fit-content';
	textTransform?: 'uppercase' | 'capitalize' | 'lowercase' | 'none';
	fontSize?: number;
	iconWidth?: number;
	iconHeight?: number;
	iconMarginRight?: number;
	className?: string;
	disabled?: boolean;
}

export const Button: React.FC<IProps> = ({
	children,
	variant = 'blue',
	onClick,
	icon,
	pt = 13,
	pr = 16,
	pb = 13,
	pl = 16,
	mt = 0,
	mr = 0,
	mb = 0,
	ml = 0,
	width = 'full-width',
	textTransform = 'capitalize',
	fontSize = 16,
	iconWidth = 18,
	iconHeight = 18,
	iconMarginRight = 10,
	className,
	disabled,
}) => (
	<button
		type='button'
		style={{
			padding: `${pt}px ${pr}px ${pb}px ${pl}px`,
			margin: `${mt}px ${mr}px ${mb}px ${ml}px`,
			width: getWidth(width),
		}}
		className={clsx(
			styles.button,
			styles[variant],
			className,
			disabled && styles.disabledBtn
		)}
		onClick={e => {
			e.currentTarget.blur();
			onClick();
		}}
	>
		{icon && (
			<div
				className={styles.icon}
				style={{
					width: iconWidth,
					height: iconHeight,
					marginRight: iconMarginRight,
				}}
			>
				{icon}
			</div>
		)}
		<span
			className={styles.text}
			style={{
				textTransform,
				fontSize,
			}}
		>
			{children}
		</span>
	</button>
);
