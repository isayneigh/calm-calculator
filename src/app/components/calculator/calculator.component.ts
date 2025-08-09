import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { OperandType } from '../../models/operand-type.enum';
import { InputType } from '../../models/input-type.enum';
import { EquationService } from '../../services/equation.service';

@Component({
  selector: 'app-calculator',
  imports: [ButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  public readonly operandType = OperandType;

  public readonly inputType = InputType;

  public constructor(public readonly equationService: EquationService) { }

  public getEquation() {
    return this.equationService.getEquation();
  }
}
