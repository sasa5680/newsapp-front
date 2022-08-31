import React from "react";
import { Helmet } from "react-helmet";

export default function Meta({newsTitle, newsImage}) {
      
    /* 트위터, 페북이 읽을 수 있게 메타데이터 추가, 안되면 next js 사용할것 */
    return (
      <Helmet>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nytimes" />
        <meta name="twitter:creator" content="@SarahMaslinNir" />
        <meta
          name="twitter:title"
          content="Parade of Fans for Houston’s Funeral"
        />
        <meta
          name="twitter:description"
          content="NEWARK - The guest list and parade of limousines with celebrities emerging from them seemed more suited to a red carpet event in Hollywood or New York than than a gritty stretch of Sussex Avenue near the former site of the James M. Baxter Terrace public housing project here."
        />
        <meta name="twitter:image" content={newsImage} />

        {/* 페이스북용 open graph */}
        <meta
          property="og:url"
          content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="When Great Minds Don’t Think Alike"
        />
        <meta
          property="og:description"
          content="How much does culture influence creative thinking?"
        />
        <meta
          property="og:image"
          content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg"
        />
      </Helmet>
    );
}