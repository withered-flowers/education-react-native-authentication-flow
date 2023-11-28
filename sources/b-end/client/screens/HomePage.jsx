import { FlatList, View, Text, StyleSheet } from "react-native";

const STATIC_DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const ItemComponent = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.itemTitle}>{title}</Text>
  </View>
);

const HomePage = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={STATIC_DATA}
        renderItem={({ item }) => <ItemComponent title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#fef08a",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 32,
    color: "#334155",
    opacity: 0.9,
  },
});

export default HomePage;
