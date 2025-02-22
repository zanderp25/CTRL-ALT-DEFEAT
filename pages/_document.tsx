import Document, { Html, Head, Main, NextScript } from 'next/document';

let websiteInfo = {
  title: "ArthroTrack",
  url: "https://cad.zp25.cc",
};

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <title>{websiteInfo.title}</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;