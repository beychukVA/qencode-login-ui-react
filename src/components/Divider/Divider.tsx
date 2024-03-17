import React from 'react';
import styles from './Divider.module.scss';

interface IProps {}

export const Divider: React.FC<IProps> = () => {
	return <div className={styles.container}></div>;
};
