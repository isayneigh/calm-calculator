import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { InputType } from '../../models/input-type.enum';
import { OperandType } from '../../models/operand-type.enum';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { EquationService } from '../../services/equation.service';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    imports: [CommonModule]
})
export class ButtonComponent implements OnInit {

    @Input()
    public type: InputType = InputType.Number;

    @Input()
    public operandType?: OperandType;

    @Input()
    public value: string = '';

    @Input()
    public disabled = false;  

    public clicked: boolean = false;

    public componentId = uuidv4();

    public readonly referenceOperandType = OperandType;

    public constructor(private readonly equationService: EquationService) { }

    public ngOnInit(): void {
        addEventListener("animationend", (event: AnimationEvent) => {
            if (event.animationName.indexOf('shine') !== -1 && this.componentId === (event.target as HTMLDivElement).id) {
                this.clicked = false;
            }
        });

        addEventListener("animationcancel", (event: AnimationEvent) => {
            if (event.animationName.indexOf('ripple') !== -1 && this.componentId === (event.target as HTMLDivElement).id) {
                this.clicked = false;
            }       
        });

        this.setValueForOperands();
        this.setValueForSpecialButtons();
    }
    public triggerClick() {
        this.clicked = true;
        this.equationService.appendToEquation(this.value);
        if (navigator.vibrate !== undefined) {
            navigator.vibrate(100);
        }
    }

    private setValueForOperands() {
        if (this.type === InputType.Operand) {
            switch (this.operandType) {
                case OperandType.Multiplication:
                    this.value = '*';
                    break;
                case OperandType.Addition:
                    this.value = '+';
                    break;
                case OperandType.Subtraction:
                    this.value = '-';
                    break;
                case OperandType.Division:
                    this.value = '÷';
                    break;
                case OperandType.Equals:
                    this.value = '=';
                    break;
                default:
                    this.value = '';
            }
        }
    }

    private setValueForSpecialButtons() {
        if (this.type === InputType.Clear) {
            this.value = "ac";
        }
    }
}
