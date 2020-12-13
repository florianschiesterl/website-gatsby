import React, { useState } from "react";
import Layout from "../components/Layout";
import { classesText } from "../components/sharedClasses";
import { Link } from "gatsby";
import classNames from "classnames";

const Odyssey = () => {
  const [showEnglish, toggleLanguage] = useState(false);

  return (
    <Layout>
      <div className="flex justify-between">
        <h2 className={classesText}>Odyssey East</h2>
        <button
          aria-label="Toggle Language"
          type="button"
          className={classNames(classesText, "underline")}
          onClick={() => {
            toggleLanguage(!showEnglish);
          }}
        >
          {showEnglish ? "German" : "English"}
        </button>
      </div>
      <p className={classesText}>–</p>
      {showEnglish ? (
        <>
          <p className={classesText}>
            When it is dragging you down. When all your power is gone. When
            gravity finally gets you. And you question yourself: Why? Why do we
            live and be in this prison made out of flesh and bone? And the
            longer you think about it, the more your thoughts move into a dark
            Nirvana. The soul is just numb, the body so heavy.
          </p>
          <p className={classesText}>
            I want to escape. I gave away everything and the little which is
            left is now in a backpack around my shoulders. And suddenly I’m not
            a prisoner of these thoughts anymore. Because I’m far away.
            Thousands of kilometers east of my home. Sometimes my thoughts come
            and find me there, but it is the east that protects me and keeps me
            safe in a magic kind of way. And even if my mind sometimes gets lost
            within the fog of meaninglessness, it is the east that keeps me
            going and discovering. All I need to do is follow my emotions. My
            camera is a compass and it guides me the way. And without even
            realizing it, my camera takes me to the places where my numbness
            suddenly gets released. Where I can feel again. It shows me moments
            rich of dedication, hope, melancholy and joy.
          </p>
          <p className={classesText}>
            What stays is the pictures I took during my journey east. Somewhere
            between Istanbul & Tokyo. They document my feelings. They are a
            reflexion of my soul traveling out of a black and numb void into a
            world filled with hundreds and thousands and even millions of tiny
            moments of life and meaning. I can see it now. I can see a big hope
            shining on the horizon.
          </p>
          <Link className={classNames(classesText, "underline")} to="/">
            Back to the photos
          </Link>
        </>
      ) : (
        <>
          <p className={classesText}>
            Wenn es dich so stark nach unten zieht, dass es dir alle Kraft
            raubt. 200 Kilogramm schwer. Und du dich fragst: Wozu? Wozu sitzen
            wir in diesem Käfig aus Knochen und Fleisch? Und je mehr du es
            zerdenkst, je mehr endet jeder deiner Gedanken in einem dunklen
            Nirvana. Die Seele taub, der Körper so schwer.
          </p>
          <p className={classesText}>
            Ich möchte entkommen. Zwei Riemen verbinden meine Habseligkeiten mit
            meinen Schultern und plötzlich werde ich nicht mehr von diesen
            Gedanken eingesperrt. Weil ich bin schon weit weg. Tausende
            Kilometer östlicher. Manchmal folgen die Gedanken mir nach, aber es
            ist der Osten der mich wie ein Schutzschild umarmt. Und wenn mein
            Geist zwar von einer Sinnlosigkeit benebelt ist, so zieht es mich
            trotzdem immer weiter. Ich höre dann auf zu denken. Stattdessen
            folge ich meinen Emotionen. Meine Kamera ist ein Kompass, und sie
            zeigt mir den Weg. Und ohne es zu ahnen führt sie mich dahin, wo die
            Taubheit endet und ich wieder fühlen kann. Zu Momenten reich an
            Hingabe, Hoffnung, Melancholie und Freude.
          </p>

          <p className={classesText}>
            Es bleiben Aufnahmen. Irgendwo zwischen Istanbul und Tokyo. Momente,
            die meinen Weg zeichnen. Aus einer schwarzen Leere hin zu einer Welt
            mit hunderten und tausenden und Millionen von kleinen Momenten des
            Lebens. Überall da wo eine große Hoffnung am Horizont scheint.
          </p>
          <Link className={classNames(classesText, "underline")} to="/">
            Zurück zu den Aufnahmen
          </Link>
        </>
      )}
    </Layout>
  );
};

export default Odyssey;
