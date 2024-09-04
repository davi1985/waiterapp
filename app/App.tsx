import { useFonts } from 'expo-font'
import { Main } from './src/Main'
import { StatusBar } from 'expo-status-bar'

const App = () => {
  const [isFontsLoaded] = useFonts({
    /* eslint-disable @typescript-eslint/no-require-imports */
    'GeneralSans-400': require('./src/assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-600': require('./src/assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans-700': require('./src/assets/fonts/GeneralSans-Bold.otf'),
  })

  return isFontsLoaded ? (
    <>
      <StatusBar style="dark" />
      <Main />
    </>
  ) : null
}

export default App
