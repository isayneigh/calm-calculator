import { Injectable } from "@angular/core";
import { parse, compile } from 'mathjs';

@Injectable({ providedIn: 'root' })
export class EquationService {

    private equation = '';

    public getEquation(): string {
        return this.equation;
    }

    public appendToEquation(value: string): void {
        if (value === '=') {
            this.equation = this.solveEquation(this.equation);
        } 
        else if (value === 'ac') {
            this.equation = '';
        }
        else {
            this.equation += value;
        }
    }

    private solveEquation(value: string): string {
        value = value.replace('÷', '/');
        let code = compile(value);
        let result = code.evaluate();
        return result.toString();
    }
}