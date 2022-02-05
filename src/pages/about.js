import React from "react";
import Layout from "../components/Layout";
import { classesText } from "../components/sharedClasses";
import Image from "../components/Image";
import { Link } from "gatsby";
import classNames from "classnames";

const About = () => {
  return (
    <Layout popupPage={true}>
      <Image
        src="florianschiesterl_self.jpg"
        className="rounded mb-16 md:mb-32"
        alt="Florian Schiesterl Self"
      />

      <p className={classesText}>
        When it is dragging me down. When all my power is gone. When gravity
        finally gets me. And when I question yourself: Why? Why do we live and
        be in this prison made out of flesh and bone? And the longer I think
        about it, the more my thoughts move into a dark Nirvana. My soul is just
        numb, my body so heavy.
      </p>
      <p className={classesText}>
        I want to escape. I gave away everything and the little which is left is
        now in a backpack around my shoulders. And suddenly I’m not a prisoner
        of these thoughts anymore. Because I’m far away. Thousands of kilometers
        east of my home. Sometimes my thoughts come and find me there, but it is
        the east that protects me and keeps me safe in a magic kind of way. And
        even if my mind sometimes gets lost within the fog of meaninglessness,
        it is the east that keeps me going and discovering. All I need to do is
        follow my emotions. My camera is a compass and it guides me the way. And
        without even realizing it, my camera takes me to the places where my
        numbness suddenly gets released. Where I can feel again. It shows me
        moments rich of dedication, hope, melancholy and joy.
      </p>
      <p className={classesText}>
        What stays is the pictures. Wherever I go. They document my feelings.
        They are a reflexion of my soul traveling out of a black and numb void
        into a world filled with hundreds and thousands and even millions of
        tiny moments of life and meaning. I can see it now. I can see a big hope
        shining on the horizon.
      </p>

      <Link className={classNames(classesText, "underline mt-16")} to="/">
        Back
      </Link>
    </Layout>
  );
};

export default About;
