import {api} from "../baseConfig";
import {eventURL} from "@env";

export const homeQuery = api.injectEndpoints({
	endpoints: (builder) => ({
		getEvents: builder.query({
			query: (params) => ({
				url: `${eventURL}/events/list`,
				method: "get",
				params: {
					perPage: params.perPage,
					page: params.page,
				},
			}),
		}),
		scanTicket: builder.mutation({
			query: (data) => ({
				url: `${eventURL}/events/tickets/scan`,
				method: "post",
				body: data,
			}),
			invalidatesTags: ["TicketHistory"],
		}),
		scannedEventHistory: builder.query({
			query: (params) => ({
				url: `${eventURL}/events/${params.eventId}/admissions`,
				method: "get",
			}),
			providesTags: ["TicketHistory"],
		}),
	}),
});

//for query useAuthQuery
export const {
	useGetEventsQuery,
	useLazyGetEventsQuery,
	useScanTicketMutation,
	useScannedEventHistoryQuery,
} = homeQuery;
