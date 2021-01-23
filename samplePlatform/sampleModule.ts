import { IConfiguration } from 'src/contracts/configuration'
import { AppModule, Module } from 'src/module'
import { Interfaces } from 'src/contracts/container'

@AppModule({
  name: 'sample',
  providers: (config: IConfiguration) => {
    return (bind: Interfaces.Bind) => {
      // bind<AuthRepository>(MeRepositoryType).toDynamicValue((context: Interfaces.Context) => {
      //   return new MeRepository(
      //     // context.container.get(RESTConnectorType),
      //   )
      // )
    }
  },
  providersAsync: false
})
export class SampleModule extends Module {}
