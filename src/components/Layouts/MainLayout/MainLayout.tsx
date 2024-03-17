import React, { ReactNode } from 'react';
import styles from './MainLayout.module.scss';

interface IProps {
	children: ReactNode;
}

export const MainLayout: React.FC<IProps> = ({ children }) => {
	return (
		<div className={styles.container}>
			<header className={styles.header}>Header Component</header>
			<main className={styles.main}>{children}</main>
			<footer className={styles.footer}>Footer Component</footer>
		</div>
	);
};
