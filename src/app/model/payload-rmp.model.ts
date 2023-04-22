import { Brand } from "./brand.model";

export interface PageRequest{
    requests:Request[];
    page:number;
    size:number;
    totalPages:number;
}



export interface PayLoadRmp{
    totalVolume:number;
    requests:Request[];
}

export interface Request{
    requestId: number;
    advice: boolean;
    campaignName: string;
    campaignDescription: string;
    decisionDeadline: Date;
    decisionDescription: string;
    key: string;
    numberOfAssets: number;
    createdDate: Date;
    updatedDate: Date;
    submittedDate : Date;
    validatedDate : Date;
    affiliate:Affiliate;
    brand:Brand;
    requestStatus:RequestStatus;
    createdBy:Person;
    updatedBy:Person;
    submittedBy: Person,
    validatedBy: Person,
    countries:Country[],
    media:Media[],
}

export interface Affiliate{
    affiliateId: number;
    name : string;
}

export interface RequestStatus{
    requestStatusId : number;
    name: string;
    value : string;
    step: number;
}
export interface Person{
    userInfoId: number;
    name: string;
    email: string;
}

export interface Country{
    countryId: number;
    name: string;
    value: string;
}

export interface Media{
    mediaId: number;
    name: string;
    value: string;
}
