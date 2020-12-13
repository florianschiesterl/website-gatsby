import React from "react";
import Layout from "../components/Layout";
import { classesText } from "../components/sharedClasses";

const Odyssey = () => {
  return (
    <Layout>
      <p className={classesText}>
        Wenn es dich so stark nach unten zieht, dass es dir alle Kraft raubt.
        200 Kilogramm schwer. Und du dich fragst: Wozu? Wozu sitzen wir in
        diesem Käfig aus Knochen und Fleisch? Und je mehr du es zerdenkst, je
        mehr endet jeder deiner Gedanken in einem dunklen Nirvana. Die Seele
        taub, der Körper so schwer.
      </p>
      <p className={classesText}>
        Ich möchte entkommen. Zwei Riemen verbinden meine Habseligkeiten mit
        meinen Schultern und plötzlich werde ich nicht mehr von diesen Gedanken
        eingesperrt. Weil ich bin schon weit weg. Tausende Kilometer östlicher.
        Manchmal folgen die Gedanken mir nach, aber es ist der Osten der mich
        wie ein Schutzschild umarmt. Und wenn mein Geist zwar von einer
        Sinnlosigkeit benebelt ist, so zieht es mich trotzdem immer weiter. Ich
        höre dann auf zu denken. Stattdessen folge ich meinen Emotionen. Meine
        Kamera ist ein Kompass, und sie zeigt mir den Weg. Und ohne es zu ahnen
        führt sie mich dahin, wo die Taubheit endet und ich wieder fühlen kann.
        Zu Momenten reich an Hingabe, Hoffnung, Melancholie und Freude.
      </p>

      <p className={classesText}>
        Es bleiben Aufnahmen. Irgendwo zwischen Istanbul und Tokyo. Momente, die
        meinen Weg zeichnen. Aus einer schwarzen Leere hin zu einer Welt mit
        hunderten und tausenden und Millionen von kleinen Momenten des Lebens.
        Überall da wo eine große Hoffnung am Horizont scheint.
      </p>
    </Layout>
  );
};

export default Odyssey;
