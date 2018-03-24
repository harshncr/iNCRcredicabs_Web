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

    static cannotcontainspecialcharacters(control:AbstractControl):ValidationErrors | null{
        if((control.value as string).match(/\D/))
            return {cannotcontainspecialcharacters: true};

        return null;
    }

    static cannotstartwithzero(control:AbstractControl):ValidationErrors | null{
    if((control.value as string).match(/^0{1}.*/))
            return {cannotstartwithzero: true};

        return null;
    }

    static invalidcabnumber(control:AbstractControl):ValidationErrors | null{
        if(!((control.value as string).match(/\w{2}(\d{1}\w{3}|\d{2}\w{2})\d{4}$/)))
            return {invalidcabnumber: true};

        return null;
    }    
}
//!@#\$%\^\&*<{:";\'/\?}|>,\)\(+=._-