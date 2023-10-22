import { TouchableOpacity, View } from "react-native";
import { Avatar, Caption, Surface, Title } from "react-native-paper";

const renderItem = (item) => {
	const image = "item.image";
	const priceChange24h = "item.price_change_24h";
	const currentPrice = "item.current_price";
	const symbol = "item.symbol";
	return (
		<TouchableOpacity
			onPress={() => getCurrentItemInfo(item)}
			style={styles.surfaceContainer}
		>
			<Surface style={styles.surface}>
				<Avatar.Image
					style={styles.avatar}
					size={28}
					source={{ uri: image && image }}
				/>
				<View style={styles.infoContainer}>
					<View style={styles.sectionContainer}>
						<Title numberOfLines={1} style={styles.coinName}>
							{symbol}
						</Title>
						<Title style={{ color: colors.primary }}>
							{" $"}
							{currentPrice}
						</Title>
					</View>
					<View style={styles.sectionContainer}>
						<Caption>Last 24h: </Caption>
						<Caption
							style={{
								color:
									priceChange24h < 0
										? colors.error
										: colors.accent,
							}}
						>
							{priceChange24h}
						</Caption>
					</View>
				</View>
				<TouchableOpacity
				// hitSlop={{ x: 10, y: 10 }}
				// onPress={() => handleFavorites(item)}
				>
					<Avatar.Icon
						size={28}
						icon="stars"
						style={[
							styles.avatar,
							{
								backgroundColor: isFavorited(item)
									? colors.accent
									: colors.disabled,
							},
						]}
					/>
				</TouchableOpacity>
			</Surface>
		</TouchableOpacity>
	);
};
