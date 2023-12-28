import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head/>
                <body>
                    {/* This is where the app is rendered */}
                    <Main />
                    {/* This is where scripts are loaded */}
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
