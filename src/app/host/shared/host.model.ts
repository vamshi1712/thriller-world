export class Host {
    constructor(  
                public email: string,
                public password: string, 
                public fullname ?: string,
                public phone ?: number,
                public location ?: string,
                public pincode ?: number,
                public isUser ?: boolean,
                public isHost ?: boolean,
                ) {}
}