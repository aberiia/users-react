export interface UserAge {
  age: number,
  date: string
}
export interface UserID {
  name: string,
  value?: string
}
export interface UserCoordinates{
    latitude: string,
    longitude: string
}

export interface UserStreet{
    name: string,
    number: number
}
export interface UserTimezone{
    descripton: string,
    offset: string
}
export interface UserLocation{
    city: string,
    coordinates: UserCoordinates,
    country: string,
    postcode: number,
    state: string,
    street: UserStreet,
    timezone: UserTimezone
}
export interface UserLogin{
    md5: string,
    password: string,
    salt: string,
    sha1: string,
    sha256: string,
    username: string,
    uuid: string
}

export interface UserName{
    first: string,
    last: string,
    title: string
}

export interface UserPicture{
    large: string,
    medium: string,
    thumbnail: string
}

export interface UserRegistered{
    age: number,
    date: string
}
export interface InitUser {
  cell: string,
  dob: UserAge,
  email: string,
  gender: string,
  id: UserID,
  location: UserLocation,
  login: UserLogin,
  name: UserName,
  nat: string,
  phone: string,
  picture: UserPicture,
  registered: UserRegistered
}
