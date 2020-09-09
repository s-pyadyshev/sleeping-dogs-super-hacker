import * as React from "react";
import "./style.scss";

const AboutPage: React.SFC = () => {
  return (
    <div className="about card">
      It is recreation of&nbsp;
      <a
        className="link"
        href="https://en.wikipedia.org/wiki/Sleeping_Dogs_(video_game)"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sleeping Dogs
      </a>
      &nbsp;camera hacking mini-game which is also a variation of&nbsp;
      <a className="link" href="https://en.wikipedia.org/wiki/Bulls_and_Cows">
        Bull and Cows
      </a>
      . Buy the game on&nbsp;
      <a
        href="https://store.steampowered.com/app/202170/Sleeping_Dogs/"
        className="link"
      >
        Steam
      </a>
      .
      <p>
        Tech stack:&nbsp;
        <a
          className="link"
          href="https://github.com/facebook/react"
          target="_blank"
          rel="noopener noreferrer"
        >
          React 16.3
        </a>
        ,&nbsp;
        <a
          className="link"
          href="https://mobx.js.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MobX
        </a>
        ,&nbsp;
        <a
          className="link"
          href="https://firebase.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Firebase
        </a>
        .
      </p>
      <p>
        I had to practice MobX and the world needs anything but another ToDo
        list - that's why you are here.
      </p>
      <p>
        Idea and images are properties of Square Enix Ltd. Background image
        by&nbsp;
        <a
          className="link"
          href="https://www.deviantart.com/lonefirewarrior/art/KISS-MY-ASS-GOD-KING-479293593"
          target="_blank"
          rel="noopener noreferrer"
        >
          lonefirewarrior
        </a>
        .
      </p>
      <p>
        Source code:&nbsp;
        <a
          className="link"
          href="https://github.com/s-pyadyshev/sleeping-dogs-super-hacker"
        >
          Github
        </a>
        .
      </p>
      <p>
        Code by:&nbsp;
        <a className="link" href="https://github.com/s-pyadyshev">
          Sergei Piadyshev
        </a>
        .
      </p>
    </div>
  );
};

export default AboutPage;
