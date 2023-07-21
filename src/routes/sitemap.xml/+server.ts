import type { RequestHandler } from './$types'
import { site } from '$lib/config/site'
import { genPosts } from '$lib/utils/posts'
import axios from "axios"

const render = (): string =>
  `<?xml version='1.0' encoding='utf-8'?>
  <urlset
    xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="https://www.w3.org/1999/xhtml"
    xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
    xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">
    <url>
      <loc>${site.protocol + site.domain}</loc>
    </url>
    ${genPosts()
      .map(
        post => `
        <url>
            <loc>${site.protocol + site.domain + post.path}</loc>
            <lastmod>${new Date(post.updated ?? post.published ?? post.created).toISOString()}</lastmod>
            <priority>0.5</priority>
            <mobile:mobile type="responsive"/>
            <image:image>
              <image:loc>${site.protocol + site.domain + post.image}</image:loc>
              <image:caption>${post.summary}</image:caption>
              <image:geo_location>Norway</image:geo_location>
              <image:title>${post.alt}</image:title>
            </image:image>
        </url>`
      )
      .join('')}
  </urlset>`.trim()

  // ping google to update the the urls of the company and the images
  const pingGoogle = async () => {
    const urls = genPosts().map((post) => site.protocol + site.domain + post.path);
    const imageUrls = genPosts().map((post) => site.protocol + site.domain + post.path + "/image.png");

    const promises = () => {
        // send post request to an api that pings google 
        return axios.post(
          `${site.protocol + site.domain}/google/indexer`, 
          { urls: urls, imageUrls: imageUrls })
          .catch((err) => {
            console.log("error: ", err.message, err.status, "sitemap.xml");
        } );
    };
    await promises();
};

pingGoogle();

export const prerender = true
export const trailingSlash = 'never'
export const GET: RequestHandler = async () =>
  new Response(render(), {
    headers: {
      'content-type': 'application/xml; charset=utf-8'
    }
  })
