export interface ServerData{
    _embedded: Employees;
    _links: Links;
    page: Page;
}

export interface Employees{
    employees: Employee[];
}
export interface Employee{
    id:         number;
    birthDate:  string;
    firstName:  string;
    lastName:   string;
    gender:     string;
    hireDate:   string;
}

export interface Links{
    first: Link;
    self:  Link;
    next:  Link;
    last:  Link;
}
export interface Link{
    href: string;
}

export interface Page{
    size:           number;
    totalElements:  number;
    totalPages:     number;
    number:         number;
}