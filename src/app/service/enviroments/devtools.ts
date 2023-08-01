import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../enviroments/enviroment';
export function getDevtoolsModule() {
  return !environment.production ? StoreDevtoolsModule.instrument() : [];
}
