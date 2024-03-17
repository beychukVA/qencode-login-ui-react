import React from 'react';
import styles from './Title.module.scss';

interface IProps {
	children: string;
}

export const Title: React.FC<IProps> = ({ children }) => {
	return <span className={styles.title}>{children}</span>;
};
