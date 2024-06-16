// components/Layout.js

import React from "react";

const CustomHeader = (props: any): any => {


    const homeHeader = {
        title: "Develop With X",
type:"website",
        description: "Discover insightful software programming tutorials, tips, and solutions on my personal blog.",
        image: "https://devwithx.com/images/img/presentation3.png",
        url: "https://devwithx.com",
        tags: "programming languages, software development, web, framework,",
        updatedAt:new Date(),
    }
    const {
        title,
        description,
        image,
        url,
        tags,
        updatedAt,
        type

    } = props?.data || homeHeader;
    return <head>
        {/* standard metadata*/}
        <meta name="google-adsense-account" content="ca-pub-8560090638214984"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon"
              type="image/png" sizes="60x60" href="/images/icons/favicon.png"/>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="robots" content="index, follow"/>
        <meta charSet="UTF-8"/>

        {/* og metadata*/}
        <meta property="og:title" content={title}/>
        <meta property="og:type" content={type || "article"}/>
        <meta property="og:url" content={url}/>

        <meta property="og:image" content={image}/>
        <meta property="og:image:alt" content={title}/>
        <meta property="og:description" content={description}/>
        <meta property="og:site_name" content={title}/>
        <meta property="og:locale" content="en_US"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>

        {/* twitter metadata*/}

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:image" content={image}/>
        <meta name="twitter:image:src" content={image}/>
        <meta property="twitter:image:alt" content={title}/>
        <meta name="twitter:site" content="@benayache_ayoub"/>
        <meta name="twitter:creator" content="@benayache_ayoub"/>
        <meta property="twitter:image:width" content="1200"/>
        <meta property="twitter:image:height" content="630"/>
        <meta name="twitter:widgets:new-embed-design" content="on"/>
        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>


        <meta name="last-updated" content={updatedAt}/>
        <meta name="environment" content="production"/>
        <link rel="canonical" href={url}/>
        <meta name="keywords" content={tags}/>


        <meta name="apple-mobile-web-app-title" content="devwithx.com"/>
        <meta name="application-name" content="devwithx.com"/>


        <link rel="search" href="https://devwithx.com/open-search.xml" type="application/opensearchdescription+xml"
              title="Dev With X"/>

        <meta property="forem:name" content="Dev with X"/>
        <meta property="forem:logo"
              content="https://devwithx.com/images/icons/favicon.png"/>
        <meta property="forem:domain" content="devwithx.com"/>


    </head>


}


export default CustomHeader;
