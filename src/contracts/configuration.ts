import { AppConfig } from "@/contracts/bootstrapper"

export interface IConfiguration {
  byFile<Expected> (name: string): Expected
  byKey<Expected> (key: string, shouldThrow?: boolean, defaultValue?: any): Expected
  has (file: string): boolean
  toObject (): AppConfig
}
