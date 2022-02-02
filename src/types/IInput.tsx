interface IUserState {
    "user-firstname": string;
    "user-lastname": string;
    valid: boolean;
  }
export interface IInput{
    inputType: string,
    focused?: boolean,
    inputValue: string,
    inputState: IUserState,
    handleInputChange: React.ChangeEventHandler<HTMLInputElement>,
    inputId: string,
    inputPlaceholder: string,
    handleInputClear: React.MouseEventHandler<SVGSVGElement>,
    inputLabel: string
}