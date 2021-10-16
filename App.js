import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './src/dashboard';
import Profile from './src/profile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
const Drawer = createDrawerNavigator();
const AuthContext = React.createContext();
const Stack = createStackNavigator();
export default function App() {
 
  function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const { signIn } = React.useContext(AuthContext);
  
    return (
      <View>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button color="#07673C" title="Sign in" onPress={() => signIn({ username, password })} />
      </View>
    );
  }

function SplashScreen() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
        if(action.token.signin){
            return {
              ...prevState,
              isSignout: false,
              userToken: 'dummy-auth-token',
            };
          } else{
            alert("Invalid login: Username and Password are not correct.")
            return {
              ...prevState,
              isSignout: true,
              userToken: null,
            };
          }
    
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        //userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        const response = await fetch('http://hayburrinnapp.azurewebsites.net/signin', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: data.username,
                password: data.password,
              })
            });
          const authState = await response.json();
          dispatch({ type: 'SIGN_IN', token: authState[0] });
        
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Navigator 
              screenOptions={{
                    headerStyle: {
                      backgroundColor: '#07673C',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                >
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: 'Sign in',
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            </Stack.Navigator>
          ) : (
            // User is signed in
            <Drawer.Navigator 
              initialRouteName="Home"
              screenOptions={{
                    headerStyle: {
                      backgroundColor: '#07673C',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerRight: () => (
                      <Button
                        onPress={() => authContext.signOut()}
                        title="Signout"
                        color="#07673C"
                      /> 
                    ),
                }}
            >
              
              <Drawer.Screen 
                name="Home" 
                component={Dashboard} />
              <Drawer.Screen 
                name="Profile" 
                component={Profile} />
              
            </Drawer.Navigator>

          )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
