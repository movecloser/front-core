import { injectable } from 'inversify'
import { Route, RouteConfig } from 'vue-router'

import localStorage from '@support/local-storage'

export enum Locale {
  En = 'en',
  No = 'no',
  Pl = 'pl',
  Ru = 'ru'
}

export enum CountryCode {
  GreatBritain = 'GB',
  Norway = 'NO',
  Poland = 'PL',
  Russia = 'RU'
}

export enum Region {
  International = 'int',

  Norway = 'no',
  Poland = 'pl',
  Russia = 'ru'
}

export interface LocaleParams {
  allowedRegions: Region[]
  countryCode: CountryCode
  defaultRegion: Region
  languageCode: string
}

export interface LocalizationConfig {
  allowedLocales: Locale[]
  defaultLocale: Locale
  localeParams: Record<Locale, LocaleParams>
}

export interface LocalizationHeader {
  [header: string]: string
}

export interface ILocalizationService {
  /**
   * Returns the list of all Locales available to be chosen by the User.
   */
  allowedLocales: Locale[]

  /**
   * Retrieves the default Locale from the initial config.
   */
  defaultLocale: Locale

  /**
   * Retrieves the default Region from the initial config.
   */
  defaultRegion: Region

  /**
   * Determines whether the initial Locale, Region and Country has been resolved from the 'localStorage'.
   */
  initialFromLocalStorage: boolean

  /**
   * Returns the list of all Regions available to be chosen by the User.
   */
  getAllowedRegions: () => Region[]

  /**
   * Retrieves the currently-selected Country.
   */
  getCountry: () => CountryCode | string

  /**
   * Retrieves the code of the default Country for the given Locale.
   */
  getDefaultCountryForLocale: (locale: Locale) => CountryCode

  /**
   * Retrieves the code of the default Region for the given Locale.
   */
  getDefaultRegionForLocale: (locale: Locale) => Region

  /**
   * Retrieves the currently-selected Locale.
   */
  getLocale: () => Locale

  /**
   * Returns the Locale using the passed-in country code.
   */
  getLocaleBasedOnCountryCode: (country: CountryCode) => Locale

  /**
   * Returns the Locale using the passed-in route.
   */
  getLocaleBasedOnRoute: (route: Route) => Locale

  /**
   * Returns the set of HTTP Headers which can be used to decorate the HTTP calls.
   */
  getLocalizationHeaders: () => LocalizationHeader

  /**
   * Retrieves the currently-selected Region.
   */
  getRegion: () => Region

  /**
   * Determines whether the given Locale is allowed by the config.
   * @param locale - The Locale that is to be checked.
   */
  isLocaleAllowed: (locale: string) => boolean

  /**
   * Determines whether the given Region is allowed by the config.
   * @param region - The Region that is to be checked.
   */
  isRegionAllowed: (region: Region) => boolean

  /**
   * Determines whether the current Region settings are international.
   */
  isRegionInternational: boolean

  /**
   * RegExp for matching the locale scheme.
   */
  localeRegExp: RegExp

  /**
   * Complements the passed-in RouteConfig[] with the locale-specific routes.
   * @param config - The base configuration of the Router.
   */
  mapRouting: (config: RouteConfig[]) => RouteConfig[]

  /**
   * Resolves the route name for the passed-in route-locale combination.
   * @param route - The route which name is to be resolved.
   * @param locale - The target locale.
   */
  resolveRouteName: (route: Route, locale: Locale) => string

  /**
   * Sets the Country.
   * @param country - The new Country that is to be set.
   */
  setCountry: (country: CountryCode | string) => void

  /**
   * Sets the Locale.
   * @param locale - The new Locale that is to be set.
   */
  setLocale: (locale: Locale) => void

  /**
   * Sets the Region.
   * @param region - The Region that is to be set.
   */
  setRegion: (region: Region) => void
}

/**
 * Manages the information about the app's locale settings.
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @author Stanisław Gregor <developer@staszek.does>
 */
@injectable()
export class LocalizationService implements ILocalizationService {
  /**
   * Stores the initial service configuration.
   * @private
   */
  private readonly _config: LocalizationConfig

  /**
   * Defines the currently-selected Country.
   * @private
   */
  private _country: CountryCode | string

  /**
   * Determines whether the initial Locale, Region and Country
   * has been resolved from the 'localStorage'.
   */
  public initialFromLocalStorage: boolean = false

  /**
   * Defines the currently-selected Locale.
   * @private
   */
  private _locale: Locale

  /**
   * RegExp for matching the locale scheme.
   */
  public localeRegExp = new RegExp('^/(?!me)[a-z]{2}(/|$)', 'g')

  /**
   * Defines the currently-selected Region.
   * @private
   */
  private _region: Region

  constructor (config: LocalizationConfig) {
    if (!config) {
      throw new Error(`The LocalizationConfig hasn't been specified and is mandatory!`)
    }

    if (!config.allowedLocales) {
      throw new Error(`The allowedLocales haven't been specified and are mandatory!`)
    }

    if (!config.defaultLocale) {
      throw new Error(`The defaultLocale hasn't been specified and is mandatory!`)
    }

    if (!config.localeParams) {
      throw new Error(`The localeParams haven't been specified and are mandatory!`)
    }

    this._config = config

    if (typeof window !== 'undefined') {
      const locale = localStorage.get('locale')
      const country = localStorage.get('country')
      const region = localStorage.get('region')

      if (locale !== null && country !== null && region !== null) {
        this._locale = locale as Locale
        this._country = country as CountryCode
        this._region = region as Region

        this.initialFromLocalStorage = true

        return
      }
    }

    this._locale = config.defaultLocale
    this._country = ''
    this._region = config.localeParams[config.defaultLocale].defaultRegion
  }

  /**
   * Returns the list of all Locales available to be chosen by the User.
   */
  public get allowedLocales (): Locale[] {
    return this._config.allowedLocales
  }

  /**
   * Retrieves the default Locale from the initial config.
   */
  public get defaultLocale (): Locale {
    return this._config.defaultLocale
  }

  /**
   * Retrieves the default Region from the initial config.
   */
  public get defaultRegion (): Region {
    return this._config.localeParams[this.getLocale()].defaultRegion
  }

  /**
   * Returns the list of all Regions available to be chosen by the User.
   */
  public getAllowedRegions (): Region[] {
    return this._config.localeParams[this.getLocale()].allowedRegions
  }

  /**
   * Retrieves the currently-selected Country.
   */
  public getCountry (): CountryCode | string {
    return this._country
  }

  /**
   * Retrieves the code of the default Country for the given Locale.
   */
  public getDefaultCountryForLocale (locale: Locale): CountryCode {
    return this._config.localeParams[locale].countryCode
  }

  /**
   * Retrieves the code of the default Region for the given Locale.
   */
  public getDefaultRegionForLocale (locale: Locale): Region {
    return this._config.localeParams[locale].defaultRegion
  }

  /**
   * Retrieves the currently-selected Locale.
   */
  public getLocale (): Locale {
    return this._locale
  }

  /**
   * Returns the Locale using the passed-in country code.
   */
  public getLocaleBasedOnCountryCode (country: CountryCode): Locale {
    let locale: Locale | null = null

    for (const localeParamsKey in this._config.localeParams) {
      if (this._config.localeParams[localeParamsKey as Locale].countryCode === country) {
        locale = localeParamsKey as Locale
        break
      }
    }

    if (!locale) {
      return this.getLocale()
    }

    return locale
  }

  /**
   * Returns the Locale using the passed-in route.
   * @param route - The route which will be used to retrieve the Locale.
   */
  public getLocaleBasedOnRoute (route: Route): Locale {
    return route.path.split('/')[1] as Locale
  }

  /**
   * Returns the set of HTTP Headers which can be used to decorate the HTTP calls.
   */
  public getLocalizationHeaders (): LocalizationHeader {
    const currentLocale: Locale = this.getLocale()
    const defaultCountryForLocale = this.getDefaultCountryForLocale(currentLocale)

    // const isCountryEnabled: boolean =
    //   typeof this.enabledCountries.find(country => country.code === defaultCountryForLocale) !== 'undefined'

    return {
      'Accept-Language': this._config.localeParams[currentLocale].languageCode,
      'X-User-Country': this.isRegionInternational ? defaultCountryForLocale : this.getCountry()
    }
  }

  /**
   * Retrieves the currently-selected Region.
   */
  public getRegion (): Region {
    return this._region
  }

  /**
   * Determines whether the given Locale is allowed by the config.
   * @param locale - The Locale that is to be checked.
   */
  public isLocaleAllowed (locale: string): boolean {
    return this._config.allowedLocales.includes(locale as Locale)
  }

  /**
   * Determines whether the given Region is allowed by the config.
   * @param region - The Region that is to be checked.
   */
  public isRegionAllowed (region: Region): boolean {
    const allowedRegions: Region[] = []

    for (const localeParamsKey in this._config.localeParams) {
      allowedRegions.push(...this._config.localeParams[localeParamsKey as Locale].allowedRegions)
    }

    return typeof allowedRegions.find(_region => _region === region) !== 'undefined'
  }

  /**
   * Determines whether the current Region settings are international.
   */
  public get isRegionInternational (): boolean {
    return this._region === Region.International || typeof this._region === 'undefined'
  }

  /**
   * Complements the passed-in RouteConfig[] with the locale-specific routes.
   * @param config - The base configuration of the Router.
   */
  public mapRouting (config: RouteConfig[]): RouteConfig[] {
    const routing: RouteConfig[] = []

    const localizeRoute = (route: RouteConfig, locale: Locale, root: boolean = true): RouteConfig => {
      const mappedRoute: RouteConfig = { ...route, name: `${locale}.${route.name}` }

      if (root) {
        mappedRoute.path = `/${locale}${mappedRoute.path}`
      }

      if (mappedRoute.children) {
        mappedRoute.children = mappedRoute.children.map(child => localizeRoute(child, locale, false))
      }

      return mappedRoute
    }

    config.forEach(route => {
      this.allowedLocales.forEach(locale => {
        routing.push(localizeRoute(route, locale))
      })
    })

    return routing
  }

  /**
   * Resolves the route name for the passed-in route-locale combination.
   * @param route - The route which name is to be resolved.
   * @param locale - The target locale.
   */
  public resolveRouteName (route: Route, locale: Locale): string {
    this._verifyLocale(locale)

    if (!route.name) {
      return `${this.defaultLocale}.root`
    }

    let name = route.name.split('.')
    name[0] = locale

    return name.join('.')
  }

  /**
   * Sets the Country.
   * @param country - The new Country that is to be set.
   */
  public setCountry (country: CountryCode | string): void {
    this._country = country

    if (typeof window !== 'undefined') {
      localStorage.set('country', country)
    }
  }

  /**
   * Sets the Locale.
   * @param locale - The new Locale that is to be set.
   */
  public setLocale (locale: Locale): void {
    this._verifyLocale(locale)

    if (!this._hasLocaleParams(locale)) {
      throw new Error(`The locale "${locale}" does NOT have any LocaleParams associated!`)
    }

    this._locale = locale

    if (typeof window !== 'undefined') {
      localStorage.set('locale', locale)
    }
  }

  /**
   * Sets the Region.
   * @param region - The Region that is to be set.
   */
  public setRegion (region: Region): void {
    if (!this.isRegionAllowed(region)) {
      throw new Error(`The Region with code '${region} is NOT present in the allowedRegions[] array!'`)
    }

    this._region = region

    if (typeof window !== 'undefined') {
      localStorage.set('region', region)
    }
  }

  /**
   * Checks whether the given locale has any LocaleParams associated with it.
   * @param locale - The locale that is to be checked.
   * @private
   */
  private _hasLocaleParams (locale: Locale): boolean {
    return typeof this._config.localeParams[locale] !== 'undefined'
  }

  /**
   * Verifies the given Locale against the allowed ones.
   * @param locale - The Locale that is to be verified.
   * @private
   */
  private _verifyLocale (locale: string): void {
    if (!this.isLocaleAllowed(locale as Locale)) {
      throw new Error(`The Locale "${locale}" is NOT allowed by the config!`)
    }
  }
}

export const LocalizationServiceType = Symbol.for('ILocaleService')
