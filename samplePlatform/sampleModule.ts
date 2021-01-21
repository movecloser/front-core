import { Interfaces } from '../src/contracts/container'
import { AppConfig } from '../src/contracts/bootstrapper'
// import { AppModule } from '../src/support/modules'

@AppModule({
  name: 'sample',
  providers: (config: AppConfig) => {
    return (bind: Interfaces.Bind) => {
      // bind<AuthRepository>(MeRepositoryType).toDynamicValue((context: Interfaces.Context) => {
      //   return new MeRepository(
      //     // context.container.get(RESTConnectorType),
      //   )
      // }).inSingletonScope()
      //
      // bind<IAuthorization>(AuthorizationType).toDynamicValue((context: Interfaces.Context) => {
      //   return new Authorization(
      //     { tokenName: 'hypemetoken' },
      //     context.container.get(DateTimeType),
      //     context.container.get(WindowType)
      //   )
      // }).inSingletonScope()
    }
  },
  providersAsync: false, // optional
  routes: routesFactory,
  state: storeFactory
})
export class SampleModule extends Module {}
