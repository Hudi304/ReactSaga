
export const URL = "http://127.0.0.1:3030"

// export interface 


export interface UserDetails {
    firstName: string
    middleName: string
    lastName: string

    email: string
    phoneNumber: string
    fax: string

    address: string
    city: string
    state: string

    zipCode: string
    country: string

    oldPassword: string
    newPassword: string
    reNewpassword: string
}

export const userDetailsInit: UserDetails = {
    firstName: '',
    middleName: '',
    lastName: '',

    email: '',
    phoneNumber: '',
    fax: '',

    address: '',
    city: '',
    state: '',

    zipCode: '',
    country: '',

    oldPassword: '',
    newPassword: '',
    reNewpassword: ''
}
