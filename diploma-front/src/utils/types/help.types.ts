export interface IHelp {
    city: string,
    type: string,
    data: IHelpData
}

export interface IHelpData {
    name: string,
    phone: string,
    description: string,
    address: string
}

export interface IHelpSelect {
    city: string,
    type: string
}
