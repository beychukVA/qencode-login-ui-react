import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAuthSlice } from './Auth/AuthSlice';

export const useStore = create(
	persist(
		(...a) => ({
			...createAuthSlice(...a),
		}),
		{ name: 'store' }
	)
);
