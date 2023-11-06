import React, {useEffect, useState} from "react";
import {
	ActivityIndicator,
	FlatList,
	LayoutAnimation,
	RefreshControl,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useLazyGetEventsQuery} from "../../Redux/ApiSlice/Queries/homeQuery";
import {setEventData, setEventId} from "../../Redux/Slicies/homeSlice";
import {CustomButton, HeaderBanner} from "../../components/Global";
import EventList from "../../components/Global/EventList";

const Event = ({navigation}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const {eventData} = useSelector((state) => state.home);
	const toggleDropdown = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setIsExpanded(!isExpanded);
	};
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const [getAllEvent, {data: event, isLoading, isFetchingNextPage}] =
		useLazyGetEventsQuery();
	const [refreshing, setRefreshing] = useState(false);
	const fetchNextPage = () => {
		if (!isFetchingNextPage && currentPage < totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};
	// console.log("---evebt-----",JSON.stringify(event?.data,null,2))
	const [selectedItemId, setSelectedItemId] = useState(null);

	const onRefresh = () => {
		setRefreshing(true);
		setCurrentPage(1);
		getAllEvent({page: 1, perPage: 15})
			.unwrap()
			.catch((e) => console.log("err ", e));
		if (event !== "undefined") {
			setRefreshing(false);
		}
	};
	const handleScan = (id) => {
		// console.log(JSON.stringify(id,null,2))

		setSelectedItemId(id);
	};
	const handleScanTicket = () => {
		if (selectedItemId === null) {
			alert("please select an event");
		} else {
			dispatch(setEventId(selectedItemId.uuid));
			const sortedData = [...eventData].sort((a, b) => {
				if (a.uuid === selectedItemId.uuid) {
					return -1;
				} else if (b.uuid === selectedItemId.uuid) {
					return 1;
				}
				return 0;
			});
			dispatch(setEventData(sortedData));
			navigation.navigate("TicketHome");
		}
	};
	useEffect(() => {
		getAllEvent({page: currentPage, perPage: 15});
		if (event) {
			dispatch(setEventData(event?.data));
		}
	}, [getAllEvent, currentPage, event]);
	useEffect(() => {
		if (event && event.meta && event.meta.pagination) {
			const {total_pages: totalPages} = event.meta.pagination;
			setTotalPages(totalPages);
		}
	}, [event]);
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
			<HeaderBanner
			// toggleDropdown={toggleDropdown} isExpanded={isExpanded}
			/>
			<View style={styles.container}>
				<Text
					style={{
						color: "#35495E",
						fontSize: 30,
						fontWeight: "400",
						lineHeight: 30,
					}}>
					Manage Event
				</Text>

				{isLoading ? (
					<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
						<ActivityIndicator size="large" color="#00ff00" />
					</View>
				) : (
					<FlatList
						data={event?.data ?? []}
						showsVerticalScrollIndicator={false}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}
						keyExtractor={(item) => item.id}
						renderItem={({item, index}) => (
							<EventList
								item={item}
								index={index}
								handleScan={handleScan}
								selectedItemId={selectedItemId}
							/>
						)}
						onEndReached={fetchNextPage}
						onEndReachedThreshold={0.5}
						ListFooterComponent={() => {
							if (currentPage < totalPages) {
								return <ActivityIndicator size="small" />;
							}
							return null;
						}}
					/>
				)}
				<View style={{justifyContent: "flex-end"}}>
					<CustomButton
						onPress={handleScanTicket}
						type="scanTicket"
						text="Go to Event"
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Event;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 15,
	},
	container: {
		flex: 1,
		marginHorizontal: 15,
	},
});
