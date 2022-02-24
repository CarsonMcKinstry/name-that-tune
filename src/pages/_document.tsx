import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html className="h-full">
                <Head>
                    <link
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        rel="stylesheet"
                    />
                </Head>
                <body className="h-full">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
