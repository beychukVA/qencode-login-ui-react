export const createAuthSlice = (set: any, ...a: any[]) => ({
	token: '',
	setToken: (token: string) => set((state: any) => ({ token: token })),
	tokenExpire: '',
	setTokenExpire: (tokenExpire: string) =>
		set((state: any) => ({ tokenExpire: tokenExpire })),
});
