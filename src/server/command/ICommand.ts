export interface ICommand{
    params: string[];
    exec: () => void;
}
