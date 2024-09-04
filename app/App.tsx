import { StyleSheet, Text, View } from 'react-native'

import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'

const App = () => {
  const [isFontsLoaded] = useFonts({
    /* eslint-disable @typescript-eslint/no-require-imports */
    'GeneralSans-400': require('./src/assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-600': require('./src/assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans-700': require('./src/assets/fonts/GeneralSans-Bold.otf'),
  })

  return isFontsLoaded ? (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'GeneralSans-400' }}>
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  ) : null
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
