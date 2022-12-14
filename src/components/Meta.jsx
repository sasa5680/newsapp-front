import React from "react";
import { Helmet } from "react-helmet";

export default function Meta({newsTitle, newsImage}) {
      
    /* 트위터, 페북이 읽을 수 있게 메타데이터 추가, 안되면 next js 사용할것 */
    return (
      <Helmet>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nytimes" />
        <meta name="twitter:creator" content="@SarahMaslinNir" />
        <meta name="twitter:title" content={newsTitle} />
        <meta
          name="twitter:description"
          content="NEWARK - The guest list and parade of limousines with celebrities emerging from them seemed more suited to a red carpet event in Hollywood or New York than than a gritty stretch of Sussex Avenue near the former site of the James M. Baxter Terrace public housing project here."
        />
        <meta name="twitter:image" content={newsImage} />

        {/* 페이스북용 open graph */}
        <meta
          property="og:url"
          content="https://www.wired.com/story/writer-sayaka-murata-inhabits-a-planet-of-her-own"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={newsTitle} />
        <meta
          property="og:description"
          content="How much does culture influence creative thinking?"
        />
        <meta property="og:image" content={newsImage} />
      </Helmet>
    );
}