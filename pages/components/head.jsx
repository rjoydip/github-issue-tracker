import Head from "next/head";
import { config } from "../utils";

export default ({ children }) => {
  const appName = config("APP_NAME");
  return (
    <>
      <Head>
        <title>{appName}</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>
      <Head>
        <body>
          <div className="header">
            <h1>{appName}</h1>
          </div>
          {children}
        </body>
      </Head>
    </>
  );
};
