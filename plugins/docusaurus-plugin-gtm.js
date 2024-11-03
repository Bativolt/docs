module.exports = function (context, options) {
    return {
      name: 'docusaurus-plugin-gtm',
  
      injectHtmlTags() {
        return {
          headTags: [
            {
              tagName: 'script',
              attributes: {
                async: true,
                src: 'https://www.googletagmanager.com/gtag/js?id=G-XL1Q15W2E6',
              },
            },
            {
              tagName: 'script',
              innerHTML: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XL1Q15W2E6');
              `,
            },
            {
              tagName: 'script',
              innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-K6L28WB5');`,
            },
          ],
          preBodyTags: [
            {
              tagName: 'noscript',
              innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K6L28WB5"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            },
          ],
        };
      },
    };
  };
  