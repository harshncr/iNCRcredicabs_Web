import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NewValidators{
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
        if((control.value as string).match(/\W/))
            return {cannotcontainspecialcharacters: true};

        return null;
    }

    static cannotstartwithzero(control:AbstractControl):ValidationErrors | null{
    if((control.value as string).match(/^0{1}.*/))
            return {cannotstartwithzero: true};

        return null;
    }

    static invalidcabnumber(control:AbstractControl):ValidationErrors | null{
        if(!((control.value as string).match((/^[A-Za-z]{2}\d{1}([A-Za-z]{1}|[A-Za-z]{3}|[A-Za-z]{2}|\d{1}[A-Za-z]{1}|\d{1}[A-Za-z]{2})\d{4}$/))))
            return {invalidcabnumber: true};

        return null;
    }
}