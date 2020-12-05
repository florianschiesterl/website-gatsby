import * as React from "react";
import Headline from "../components/Headline";
import { Link } from "gatsby";

const IndexPage = () => {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.querySelector("html").classList.add("dark");
  } else {
    document.querySelector("html").classList.remove("dark");
  }

  // Whenever the user explicitly chooses light mode
  localStorage.theme = "dark";

  return (
    <main className="h-screen w-screen">
      <title>Home Page</title>
      <div className="h-screen">
        <section className="bg-white dark:bg-black w-1/3 h-full p-4 fixed">
          <nav>
            <Headline>Congratulations Floli</Headline>
            <Link className="text-black dark:text-white" to="/">
              Go home
            </Link>
            <button
              className="p-3 bg-black dark:bg-white rounded-full"
              label="Dark mode"
              onClick={toggleDarkmode}
            />
          </nav>
        </section>
        <section className="bg-white dark:bg-black ml-1/3 w-2/3">
          <div className="p-20">
            <p className="text-black dark:text-white">
              Minions ipsum hahaha me want bananaaa! Aaaaaah bananaaaa jiji la
              bodaaa jeje gelatooo bappleees. Bappleees poulet tikka masala
              wiiiii bee do bee do bee do belloo! Pepete daa bee do bee do bee
              do potatoooo. Bappleees aaaaaah underweaaar potatoooo potatoooo
              bananaaaa. Poulet tikka masala jiji belloo! Tatata bala tu
              gelatooo bappleees. Po kass daa uuuhhh me want bananaaa! Wiiiii
              tatata bala tu poulet tikka masala po kass. Butt butt hahaha
              poulet tikka masala butt daa baboiii. Poulet tikka masala gelatooo
              butt tulaliloo poopayee para tú tulaliloo hana dul sae chasy
              aaaaaah baboiii. Tulaliloo hana dul sae aaaaaah poopayee butt la
              bodaaa. Underweaaar jeje para tú po kass. Uuuhhh ti aamoo! Daa
              tank yuuu! Bananaaaa butt gelatooo hana dul sae chasy hahaha.
              Underweaaar tatata bala tu aaaaaah jeje belloo! Potatoooo hahaha
              uuuhhh bee do bee do bee do underweaaar tatata bala tu. Potatoooo
              la bodaaa poopayee jiji jeje poulet tikka masala uuuhhh. Pepete
              hahaha baboiii tatata bala tu bee do bee do bee do pepete
              bananaaaa poulet tikka masala gelatooo bee do bee do bee do.
              Underweaaar wiiiii underweaaar butt belloo! Poopayee uuuhhh
              tulaliloo jeje underweaaar pepete po kass poulet tikka masala daa
              hahaha. Gelatooo underweaaar tank yuuu! Jiji po kass belloo! Bee
              do bee do bee do tulaliloo tatata bala tu potatoooo daa hana dul
              sae jeje bee do bee do bee do la bodaaa. Jiji tulaliloo butt
              uuuhhh. Tulaliloo hahaha ti aamoo! Poopayee hahaha baboiii. Chasy
              bee do bee do bee do jiji jeje bananaaaa. Me want bananaaa! ti
              aamoo! Jiji bananaaaa baboiii poopayee jiji bappleees aaaaaah
              baboiii daa. La bodaaa gelatooo potatoooo gelatooo para tú tatata
              bala tu hana dul sae gelatooo. Pepete tulaliloo poopayee
              underweaaar aaaaaah tank yuuu! Chasy me want bananaaa! Tank yuuu!
              Para tú. Gelatooo jeje para tú wiiiii tatata bala tu. Gelatooo
              baboiii jiji wiiiii wiiiii tulaliloo. Underweaaar wiiiii daa
              pepete me want bananaaa! Aaaaaah la bodaaa uuuhhh belloo!
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

const toggleDarkmode = () => {
  if (localStorage.theme === "dark") {
    document.querySelector("html").classList.remove("dark");
    localStorage.theme = "light";
  } else {
    document.querySelector("html").classList.add("dark");
    localStorage.theme = "dark";
  }
};

export default IndexPage;
