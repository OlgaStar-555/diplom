import { useState } from "react";

import "./App.css";
import Background from "./components/bg/Background";
import Content from "./components/content/Content";
import Header from "./components/header/Header";
import NavDate from "./components/NavDate/NavDate";

export default function App() {
  console.log("App");

  const [isAdmin, setIsAdmin] = useState(false);

  const onClick = () => {
    console.log("13");
    setIsAdmin(!isAdmin);
  };

  return (
    <>
      <Background isAdmin={isAdmin} />
      <Header onClick={onClick} />
      <main>
        <NavDate/>
        <Content></Content>
      </main>
    </>
  );
}
