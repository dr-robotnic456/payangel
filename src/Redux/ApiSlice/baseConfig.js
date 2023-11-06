import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "@env";
import {TEST_MODE} from "./Queries/testConfig";

const customFetch = async (url, options) => {
	const response = await fetch(url, options);
	const data = await response.json();
	return {data};
};

const setBaseQuery = (_customFetch) => {
	const params = {
		baseUrl: baseUrl,

		prepareHeaders: (headers, {getState}) => {
			headers.set("Accept", "application/json");
			headers.set("Content-Type", "application/json");
			const {token, tokenExpiration} = getState().user;

			if (
				token?.token &&
				tokenExpiration?.tokenExpiration &&
				new Date().getTime() < tokenExpiration?.tokenExpiration
			) {
				headers.set("Authorization", `Bearer ${token.token}`);
			} else {
				// Token expired or not available, handle the logout or prompt the user to log in again
				// dispatch(logoutAction()); // Example action to reset the user state
			}

			return headers;
		},
	};
	if (_customFetch) {
		params.fetchFn = _customFetch;
	}
	return fetchBaseQuery(params);
};

const baseQuery = setBaseQuery(TEST_MODE ? customFetch : null);

const baseQueryWithReAuth = async (args, api, extraOptions) => {
	const response = await baseQuery(args, api, extraOptions);
	//to perform any function or manipulation of data

	return response;
};

export const api = createApi({
	baseQuery: baseQueryWithReAuth,
	reducerPath: "apiPath",
	tagTypes: ["TicketHistory"],
	endpoints: (builder) => ({}),
});
