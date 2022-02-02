export interface IInputState {
    "user-firstname"?: string;
    "user-lastname"?: string;
    valid?: boolean;
    login?: string;
    password?: string;
    isValid?: boolean;
    email?: string;
    passwordConfirm?: string;
}

export interface IInput{
    inputType: string,
    focused?: boolean,
    inputValue: string,
    inputState: IInputState,
    handleInputChange: React.ChangeEventHandler<HTMLInputElement>,
    inputId: string,
    inputPlaceholder: string,
    handleInputClear: React.MouseEventHandler<SVGSVGElement>,
    inputLabel: string
}