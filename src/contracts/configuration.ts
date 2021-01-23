import { AppConfig } from "@/contracts/bootstrapper"

export interface IConfiguration {
  byFile<Expected> (name: string): Expected
  byKey<Expected> (key: string, shouldThrow?: boolean, defaultValue?: any): Expected|null
  has (file: string): boolean
  toObject (): AppConfig
}
