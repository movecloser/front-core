import { injectable } from 'inversify'

export interface IMetaTags {
  get (title: string, desc: string, url?: string, image?: string): ITags
}

export interface ITags {
  [key: string]: any
}

export const MetaTagsType = Symbol.for('IMetaTags')

/**
 * MetaTags is service class that handles general meta tags
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
@injectable()
export class MetaTags implements IMetaTags {
  public get (
    title: string,
    desc: string,
    url: string = `${process.env.VUE_APP_WEB_URL}`,
    image: string = `${process.env.VUE_APP_WEB_URL}/OG_image.png`
  ): ITags {
    desc = desc.trim().replace(/(\r\n|\n|\r)/gm, ' ')

    if (desc.length > 255) {
      desc = `${desc.slice(0, 252)}...`
    }

    return {
      title: title,
      meta: [
        { vmid: 'description', name: 'description', content: desc },
        // OG Tags
        { vmid: 'og:title', name: 'og:title', content: title },
        { vmid: 'og:description', name: 'og:description', content: desc },
        { vmid: 'og:image', name: 'og:image', content: image },
        { vmid: 'og:url', name: 'og:url', content: url },
        // Twitter tags
        { vmid: 'twitter:title', name: 'twitter:title', content: title },
        { vmid: 'twitter:description', name: 'twitter:description', content: desc },
        { vmid: 'twitter:image', name: 'twitter:image', content: image },
        { vmid: 'twitter:card', name: 'twitter:card', content: `summary_large_image` }
      ],
      htmlAttrs: {
        lang: 'pl'
      }
    }
  }
}
