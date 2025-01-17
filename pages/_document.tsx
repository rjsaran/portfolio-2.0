import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#011627" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={"anonymous"}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          {/* Meta Description = Search Engines, OG Descriptions = Social media */}
          {/* og meta */}
          <meta
            property="og:title"
            content="Ramjeet Saran - Software Engineer"
          />
          <meta property="og:site_name" content="Ramjeet Saran Portfolio" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="summary" />
          <meta
            property="og:description"
            content="I craft interactive and beautiful web apps, and I love what I do. With every line of code, I strive to make the web a better place. View my projects"
          />
          <meta
            name="description"
            content="I craft interactive and beautiful web apps, and I love what I do. With every line of code, I strive to make the web a better place. View my projects"
          />
          {/* pwa tags */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta
            name="apple-mobile-web-app-title"
            content="Ramjeet Saran - Software Engineer"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="application-name"
            content="Ramjeet Saran - Software Engineer"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="msapplication-TileColor" content="#011627" />
          <meta name="msapplication-tap-highlight" content="no" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
