import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {
  
  constructor() { }
    
  isValid = ( forma: FormGroup, field: string ): boolean | null =>{
      return forma.controls[field].errors && forma.controls[field].touched;
  }

  getMessageError( forma: FormGroup,field: string ){
    const errors = forma.controls[field].errors;
    
    if( !errors ) return;
    console.log(errors);
    
    for( let key of Object.keys(errors) ){
      switch( key ){
        case 'required': return 'Campo obligatorio';

        case 'min': return `Solo se acepta valores iguales o mayores que ${errors['min']['min']}`;
        case 'minlength': 
            return (field == 'name')
                ? 'Nombre muy corto'
                : `Se requiere mínimo ${errors['minlength'].requiredLength} caracteres`;

        case 'maxlength': 
            return (field == 'nombre') 
                ? 'Nombre muy largo'
                : `Se requiere como máximo ${errors['maxlength'].requiredLength}`

        case 'invalidEmail': return 'Formato de email invalido';
        case 'notCharacterSpecial': return 'No se aceptan caracter especiales como: _-.,';
        case 'invalidObject': return 'Objecto vacio';
      }
    }

    return;
  }

  notCharacterSpecial( control: FormControl ): {[key: string]: any} | null{
    const characterRegExp = /^[a-zA-Z0-9]+$/;

    return (control.value && !characterRegExp.test(control.value)) ? { notCharacterSpecial: true } : null;
  }

  emailValidator(control: FormControl): { [key: string]: any } | null {
    const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

    return (control.value && !emailRegexp.test(control.value )) ? { invalidEmail: true } : null;
  }

  notObjectNull(control: FormControl){
    const value = control.value;
    return ( Object.keys(value).length > 0 ) ? null : { invalidObject: true };
  }

}