import Navigator from "./navigation/Navigator";
import { useFonts } from "expo-font";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./context/Auth";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider as RdxProvider } from "react-redux";
import store from "./features/store";

export default function App() {
  // Load fonts
  const [loaded] = useFonts({
    "menu-font": require("./assets/fonts/RammettoOne-Regular.ttf"),
    "tt-bold": require("./assets/fonts/TTNormsProBold.otf"),
    "tt-semi": require("./assets/fonts/TTNormsProBold.otf"),
    "tt-med": require("./assets/fonts/TTNormsProMedium.otf"),
    "tt-reg": require("./assets/fonts/TTNormsProMedium.otf"),
    "tt-ex": require("./assets/fonts/TTNormsProExtraBold.otf"),
  });

  if (!loaded) return null;

  const client = new ApolloClient({
    uri: "https://menuapp-server.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <RdxProvider store={store}>
        <StatusBar style="dark" />
        <AuthProvider>
          <Navigator />
        </AuthProvider>
      </RdxProvider>
    </ApolloProvider>
  );
}
