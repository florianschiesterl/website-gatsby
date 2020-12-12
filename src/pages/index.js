import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Photos from "../components/Photos";
import Navitem from "../components/Navitem";
import { Link } from "gatsby";
import classNames from "classnames";

const IndexPage = () => {
  const [isDark, setDarkmode] = useState(true);

  useEffect(function onFirstMount() {
    document.querySelector("html").classList.add("dark");
  }, []); // empty dependencies array means "run this once on first mount"

  const classesText = classNames(
    "block text-black dark:text-white text-base spring transition-colors duration-1000 leading-normal"
  );

  return (
    <main className="h-screen w-screen bg-black">
      <title>Florian Schiesterl - Colorful within</title>
      <div className="absolute z-20 top-1/2 left-1/2 -ml-10 -mt-2 items-center animate-fadeout pointer-events-none">
        <Spinner className="text-white animate-spin justify-center items-center" />
      </div>
      <div className="h-screen animate-fadein">
        <section className="bg-white dark:bg-black w-1/4 h-full p-16 pr-4 fixed spring transition-colors duration-1000">
          <nav>
            <Link to="/">
              <h1 className={classesText}>Florian Schiesterl</h1>
            </Link>
            <h2 className={classesText}>Colorful within.</h2>
            <button
              aria-label="Toggle Darkmode"
              type="button"
              className="mt-3 w-6 h-6 block bg-black dark:bg-white rounded-full transform spring duration-200 hover:scale-150"
              onClick={() => {
                if (isDark) {
                  document.querySelector("html").classList.remove("dark");
                  setDarkmode(false);
                } else {
                  document.querySelector("html").classList.add("dark");
                  setDarkmode(true);
                }
              }}
            ></button>
          </nav>
          <nav className="bottom-16 left-16 absolute">
            <Navitem classesText={classesText} title="Odyssey East" link="/" />
            <Navitem classesText={classesText} title="About" link="/" />
            <Navitem classesText={classesText} title="Instagram" link="/" />
          </nav>
        </section>

        <section className="bg-white dark:bg-black ml-1/4 w-3/4 spring transition-colors duration-1000">
          <div className="p-16">
            <Photos />
            <p className={classesText}>
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

export default IndexPage;
