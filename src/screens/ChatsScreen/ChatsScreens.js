import { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import chats from "../../../assets/data/chats.json";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { listChatRooms } from "./queries";
import ChatListItem from "../../components/ChatListItem";

const ChatsScreen = () => {
  const [chatRoom, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
      );
      

      setChatRooms(response.data.getUser.ChatRooms.items);
    };
    fetchChatRooms();
  }, []);

  return (
    <FlatList
      data={chatRoom}
      renderItem={({ item }) => <ChatListItem chat={item.chatRoom} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ChatsScreen;
