import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { Header } from "./components/Header/Header";
import styles from "./styles/App.module.scss";
import { Homepage } from "./pages/Homepage/Homepage";
import { MemorizationPage } from "./pages/MemorizationPage/MemorizationPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";

import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const onThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const [data, setData] = useLocalStorage("data", []);
  const [page, setPage] = useState({ name: "home" });

  return (
    <>
      <h1 className="sr-only">A Memorization Application</h1>
      <Header theme={theme} onThemeChange={onThemeChange} setPage={setPage} />
      <main className={styles.main}>
        <AnimatePresence>
          {page.name === "home" && (
            <Homepage data={data} setData={setData} setPage={setPage} />
          )}
          {page.name === "memorization" && (
            <MemorizationPage
              data={data}
              setData={setData}
              textId={page.args.textId}
              setPage={setPage}
            />
          )}
          {page.name === "about" && <AboutPage setPage={setPage} />}
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;
