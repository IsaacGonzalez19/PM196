import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Home from './screens/home';
import Profile from './screens/profile';
import Settings from './screens/settings';
import Detalle from './screens/detalle';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator para Profile y Detalle
function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileMain"
                component={Profile}
                options={{ title: 'Perfil' }}
            />
            <Stack.Screen
                name="Detalle"
                component={Detalle}
                options={{ title: 'Detalle de Usuario' }}
            />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'home';
                        } else if (route.name === 'Profile') {
                            iconName = 'person';
                        } else if (route.name === 'Settings') {
                            iconName = 'settings';
                        }
                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },

                    tabBarActiveTintColor: '#007BFF',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle:{
                        paddingBottom:5,
                        height:60,
                    }
                })}>
                <Tab.Screen
                    name="Home"
                    component={Home}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileStack}
                    options={({ route }) => ({
                        tabBarStyle: {
                            display: getFocusedRouteNameFromRoute(route) === 'Detalle' ? 'none' : 'flex',
                            paddingBottom: 5,
                            height: 60,
                        }
                    })}
                />
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}