export class User {
    constructor(  
                public email: string,
                public password: string, 
                public fullname ?: string,
                public phone ?: number,
                public location ?: string,
                public pincode ?: number,
                public isMarried ?: boolean,
                public isUser ?: boolean,
                public isHost ?: boolean,
                ) {}
}