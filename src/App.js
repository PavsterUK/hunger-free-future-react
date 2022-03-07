import Body from "./components/Layout/Body";
import Header from "./components/Layout/Header";

import styles from "./App.module.css"
import Footer from "./components/Layout/Footer";

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
