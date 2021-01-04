import '../styles/globals.css'
import AuthContextProvider from '../context/auth-context'; 

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />;
    </AuthContextProvider>
  )
 
}

export default MyApp
