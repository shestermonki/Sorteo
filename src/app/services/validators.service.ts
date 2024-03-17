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
      
      for( let key of Object.keys(errors) ){
        switch( key ){
          case 'required': return 'Campo obligatorio';

          case 'minlength': 
              return (field == 'nombre')
                  ? 'Nombre muy corto'
                  : `Se requiere mínimo ${errors['minlength'].requiredLength} caracteres`;

          case 'maxlength': 
              return (field == 'nombre') 
                  ? 'Nombre muy largo'
                  : `Se requiere como máximo ${errors['maxlength'].requiredLength}`

          case 'notCharacterSpecial': return 'No se aceptan caracter especiales como: _-.,';
        }
      }

      return;
    }

    notCharacterSpecial( control: FormControl ): {[key: string]: any} | null{
        const characterRegExp = /^[a-zA-Z0-9]+$/;

        return (control.value && !characterRegExp.test(control.value)) ? { notCharacterSpecial: true } : null;
    }
}