import { Injectable } from '@angular/core';

import jwt_decode from 'jwt-decode';

@Injectable()
export class Authorities {

    giveName(): string {
        const token = String(localStorage.getItem('access_token'));
        const user: any = jwt_decode(token);
        return user.name;
    }
    
    hasPermission(role: string): boolean {
        const token = String(localStorage.getItem('access_token'));
        const user: any = jwt_decode(token);
        return user.authorities.includes(role) ? true : false;
    }
} 
