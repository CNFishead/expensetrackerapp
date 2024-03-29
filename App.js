import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense.screen";
import RecentExpenses from "./screens/RecentExpenses.screen";
import AllExpenses from "./screens/AllExpenses.screen";
import colors from "./constants/colors";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/iconButton/IconButton.component";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: colors.primary500 },
        tabBarActiveTintColor: colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton onPress={() => navigation.navigate("ManageExpense", {})} icon="add" color={tintColor} size={30} />
        ),
      })}
    >
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" color={color} size={size} />,
          title: "Recent",
          tabBarLabel: "Recent",
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
          title: "All",
          tabBarLabel: "All",
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary500 },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="ExpensesOver"
            component={ExpensesOverview}
            options={{
              // we only want the header disabled on this screen
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ManageExpense"
            component={ManageExpense}
            options={() => ({
              presentation: "modal",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
