import type { Plugin } from 'vite';

export function setupHtmlPlugin(buildTimestamp: number): Plugin {
  return {
    name: 'html-timestamp-plugin', // 更具描述性的插件名称

    transformIndexHtml(html) {
      const metaTag = `
        <meta name="buildTimestamp" content="${buildTimestamp}">
      `.trim();

      // 使用标志字符串作为插入点
      const marker = '<!-- build-timestamp-injection -->';
      if (html.includes(marker)) {
        return html.replace(marker, `${metaTag}\n${marker}`);
      } else {
        console.warn('Marker string not found in HTML. Meta tag will be injected at the end of <head>.');
        return html.replace('</head>', `${metaTag}\n</head>`);
      }
    }
  };
}