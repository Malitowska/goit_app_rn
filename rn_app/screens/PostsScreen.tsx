import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { colors } from "../styles/global";
import { RouteProp } from "@react-navigation/native";
import Post, { PostProps } from "../components/Post";

const data = [
  {
    id: "1",
    pictureUrl: "https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pictureName: "Балон над долиною",
    comments: [
      {
        id: "1",
        author: "Alex",
        comment: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        dateTime: "09 червня, 2020 | 08:40",
      },
    ],
    locality: "New York",
    geoLocation: {
      latitude: 40.73061,
      longitude: -73.935242,
    },
  },
  {
    id: "2",
    pictureUrl: "https://images.pexels.com/photos/1314451/pexels-photo-1314451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pictureName: "Зеркальне озеро",
    comments: [
      {
        id: "2",
        author: "Maria",
        comment: "The composition here is just perfect!",
        dateTime: "15 серпня, 2021 | 14:25",
      },
    ],
    locality: "San Francisco",
    geoLocation: {
      latitude: 37.774929,
      longitude: -122.419418,
    },
  },
  {
    id: "3",
    pictureUrl: "https://images.pexels.com/photos/669007/pexels-photo-669007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pictureName: "Осінній лист",
    comments: [
      {
        id: "3",
        author: "Liam",
        comment: "Incredible shot with great colors!",
        dateTime: "12 травня, 2022 | 10:15",
      },
    ],
    locality: "Los Angeles",
    geoLocation: {
      latitude: 34.052235,
      longitude: -118.243683,
    },
  },
  {
    id: "4",
    pictureUrl: "https://images.pexels.com/photos/161091/pexels-photo-161091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pictureName: "Тюльпанове поле",
    comments: [
      {
        id: "4",
        author: "Sophia",
        comment: "I love how you captured the light here.",
        dateTime: "22 жовтня, 2022 | 16:50",
      },
    ],
    locality: "Chicago",
    geoLocation: {
      latitude: 41.878113,
      longitude: -87.629799,
    },
  },
  {
    id: "5",
    pictureUrl: "https://images.pexels.com/photos/167764/pexels-photo-167764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pictureName: "Гірський краєвид",
    comments: [
      {
        id: "5",
        author: "James",
        comment: "The details in this are amazing!",
        dateTime: "03 березня, 2023 | 07:35",
      },
    ],
    locality: "Houston",
    geoLocation: {
      latitude: 29.760427,
      longitude: -95.369804,
    },
  },
  {
    id: "6",
    pictureUrl: "https://images.pexels.com/photos/1133955/pexels-photo-1133955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pictureName: "Рисове поле",
    comments: [
      {
        id: "6",
        author: "Emma",
        comment: "Amazing landscape and vibrant colors!",
        dateTime: "10 липня, 2021 | 09:05",
      },
    ],
    locality: "Miami",
    geoLocation: {
      latitude: 25.7617,
      longitude: -80.1918,
    },
  },
  {
    id: "7",
    pictureUrl: "https://images.pexels.com/photos/145685/pexels-photo-145685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pictureName: "Рожеві троянди",
    comments: [
      {
        id: "7",
        author: "Lucas",
        comment: "Beautiful details in the petals!",
        dateTime: "18 лютого, 2022 | 15:50",
      },
    ],
    locality: "Austin",
    geoLocation: {
      latitude: 30.267153,
      longitude: -97.743057,
    },
  },
  {
    id: "8",
    pictureUrl: "https://images.pexels.com/photos/1314451/pexels-photo-1314451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pictureName: "Скеля та озеро",
    comments: [
      {
        id: "8",
        author: "Ella",
        comment: "Incredible view with perfect reflections.",
        dateTime: "01 червня, 2023 | 13:40",
      },
    ],
    locality: "Denver",
    geoLocation: {
      latitude: 39.739235,
      longitude: -104.99025,
    },
  },
  {
    id: "9",
    pictureUrl: "https://images.pexels.com/photos/1157391/pexels-photo-1157391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pictureName: "Колібрі",
    comments: [
      {
        id: "9",
        author: "Michael",
        comment: "Such a delicate and stunning capture!",
        dateTime: "20 березня, 2021 | 11:20",
      },
    ],
    locality: "Orlando",
    geoLocation: {
      latitude: 28.538336,
      longitude: -81.379234,
    },
  },
  {
    id: "10",
    pictureUrl: "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pictureName: "Орхідея",
    comments: [
      {
        id: "10",
        author: "Olivia",
        comment: "Perfect color balance and clarity!",
        dateTime: "07 травня, 2020 | 12:10",
      },
    ],
    locality: "Seattle",
    geoLocation: {
      latitude: 47.606209,
      longitude: -122.332069,
    },
  }
];

const avatarUrl =
  "https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

type PostsScreenRouteProp = RouteProp<
  { params: { user?: { email: string }; post?: PostProps } },
  "params"
>;

const PostsScreen = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: PostsScreenRouteProp;
}) => {
  const [posts, setPosts] = useState<PostProps[]>(data);

  const navigateToComments = (item: PostProps) => {
    navigation.navigate("Comments", { item });
  };
  const navigateToMap = (item: PostProps) => {
    navigation.navigate("Map", { item });
  };

  useEffect(() => {
    if (route.params?.user) {
      console.log({ user: route.params.user });
    }
    if (route.params?.post) {
      setPosts((prev) => {
        return [...prev, route.params.post!];
      });
    }
  }, [route.params?.post, route.params?.user]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
        }}
      >
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={
              avatarUrl && {
                uri: avatarUrl,
              }
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 13, fontWeight: 500 }}>NickName</Text>
          <Text style={{ fontSize: 11, fontWeight: 400 }}>
            {route?.params?.user && route.params.user.email}
          </Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => {
          return (
            <Post
              pictureUrl={item.pictureUrl}
              pictureName={item.pictureName}
              comments={item.comments}
              locality={item.locality}
              geoLocation={item.geoLocation}
              navigateToComments={() => navigateToComments(item)}
              navigateToMap={() => navigateToMap(item)}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
    gap: 32,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.light_gray,
    backgroundColor: colors.light_gray,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
});

export default PostsScreen;
