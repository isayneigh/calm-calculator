import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { CalculatorComponent } from './app/components/calculator/calculator.component';

bootstrapApplication(CalculatorComponent, appConfig)
  .catch((err) => console.error(err));
