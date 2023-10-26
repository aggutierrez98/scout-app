import {
  ActivityIndicator,
  Avatar,
  Divider,
  List,
  MD3Colors,
  Surface,
  Text,
  TouchableRipple,
} from "react-native-paper";
import ListItem from "../ListItem";
import { useScouts } from "../../client/scouts";
import { Fragment, useState } from "react";
import { FlatList } from "react-native";
import { Scout } from "types/interfaces/scout";
import { useRouter } from "expo-router";
import { useMenuContext } from "context/MenuContext";
import { useRenewLogin, useUsers } from "client/auth";
import { User } from "types/interfaces/auth";

interface Props {
  searchQuery: string;
}

export default function UsersList({ searchQuery }: Props) {
  const router = useRouter();
  const { data, isError, fetchNextPage, hasNextPage, isLoading } = useUsers({
    searchQuery,
  });
  const flattenData: User[] = data?.pages.flatMap((page) => page || []) || [];

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <List.Section
      style={{
        marginBottom: 50,
        marginTop: 10,
      }}
    >
      <FlatList
        data={flattenData}
        keyExtractor={(user) => user.id}
        renderItem={({ item }: { item: User }) => (
          <Fragment key={item.id}>
            <TouchableRipple
              onPress={() => {
                router.push(`/(drawer)/users/${item.id}`);
              }}
              rippleColor="rgba(0, 0, 0, .12)"
            >
              <List.Item
                title={`${item.username}`}
                style={{ alignItems: "center" }}
                titleStyle={{ fontSize: 20 }}
                left={() => (
                  <Avatar.Text
                    size={30}
                    label={item.username.slice(0, 2).toLocaleUpperCase()}
                  />
                )}
              />
            </TouchableRipple>
            <Divider />
          </Fragment>
        )}
        onEndReached={loadNextPageData}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          hasNextPage ? (
            <ActivityIndicator
              animating
              style={{ marginTop: 25 }}
              size={"small"}
            />
          ) : null
        }
        ListEmptyComponent={
          <Surface
            style={{
              marginTop: 15,
              padding: 20,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
            elevation={1}
          >
            <Text variant="titleMedium">No se encontraron resultados</Text>
          </Surface>
        }
      />
    </List.Section>
  );
}
