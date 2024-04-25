import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  // => Ici AppModule sert à démarrer l'application
  .catch((err) => console.error(err));
