import { StoreApi } from 'zustand';

export type setState = (
	partial: unknown,
	replace?: boolean | undefined
) => void;
export type getState = () => unknown;
export type store = StoreApi<unknown>;
