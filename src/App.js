import Body from "./components/Layout/Body";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

import styles from "./App.module.css"

function App() {
  return (
    <div className={styles.container} >
      <Header/> 
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;
