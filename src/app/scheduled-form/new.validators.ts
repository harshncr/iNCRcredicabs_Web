import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NewValidators{
aplhabet=[];
    static cannotcontainspace(control:AbstractControl):ValidationErrors | null{
        if((control.value as string).indexOf(" ")>=0)
            return {cannotcontainspace: true};

        return null;
    }

    static cannotcontainalphabets(control:AbstractControl):ValidationErrors | null{
        if((control.value as string).match('[A-Z a-z]'))
            return {cannotcontainalphabets: true};

        return null;
    }
    
}