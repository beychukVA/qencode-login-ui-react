import React, { ReactNode } from 'react';
import styles from './OnboardingLayout.module.scss';

interface IProps {
	children: ReactNode;
}

export const OnboardingLayout: React.FC<IProps> = ({ children }) => {
	return <main className={styles.container}>{children}</main>;
};
