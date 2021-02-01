import { AppConfig } from "./bootstrapper"

export interface IConfiguration {
  byFile<Expected> (name: string): Expected
  byKey<Expected> (
    key: string,
    shouldThrow?: boolean,
    defaultValue?: Expected | null
  ): Expected | null
  has (file: string): boolean
  toObject (): AppConfig
}
