import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export type CallBackRequest<T> = (success: boolean, responseObject: T | string) => void;

@Injectable({
	providedIn: 'root'
})

export class RequestService {

	constructor(
		protected http: HttpClient, 
		protected router: Router,
	) { }

	protected logoff(): void {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		this.router.navigate(['/auth']);
	}

	protected createURL(endpoint: string): string {
		return environment.baseURL + endpoint;
	}

	protected getRequest<T>(endpoint: string, callBack: CallBackRequest<T>): void {
		const url = this.createURL(endpoint);
		this.http.get<T>(url, { observe: 'response' }).subscribe({
			next: ({ body }: any) => {
				if (callBack) callBack(true, body);
			},
			error: error => {
				const errorMessage = error.error[0] || 'Não foi possível conectar-se ao servidor. Tente novamente mais tarde';
				if(error.status === 401) {
					this.logoff();
				}
				if (callBack) callBack(false, errorMessage);
			}
		});
	}

	protected postRequest<T>(endpoint: string, params: object, callBack: CallBackRequest<T>): void {
		const url = this.createURL(endpoint);
		this.http.post<T>(url, params).subscribe({
			next: ({ body }: any) => {
				if (callBack) callBack(true, body);
			},
			error: error => {
				const errorMessage = error.error[0] || 'Não foi possível conectar-se ao servidor. Tente novamente mais tarde';
				if(error.status === 401) {
					this.logoff();
				}
				if (callBack) callBack(false, errorMessage);
			}
		});
	}

	protected deleteRequest<T>(endpoint: string, callBack: CallBackRequest<T>): void {
		const url = this.createURL(endpoint);
		this.http.delete<T>(url).subscribe({
			next: (response) => {
				if (callBack) callBack(true, response);
			},
			error: error => {
				const errorMessage = error.error[0] || 'Não foi possível conectar-se ao servidor. Tente novamente mais tarde';
				if(error.status === 401) {
					this.logoff();
				}
				if (callBack) callBack(false, errorMessage);
			}
		});
	}

	protected putRequest<T>(endpoint: string, params: object, callBack: CallBackRequest<T>): void {
		const url = this.createURL(endpoint);
		this.http.put<T>(url, params).subscribe({
			next: (response) => {
				if (callBack) callBack(true, response);
			},
			error: error => {
				const errorMessage = error.error[0] || 'Não foi possível conectar-se ao servidor. Tente novamente mais tarde';
				if(error.status === 401) {
					this.logoff();
				}
				if (callBack) callBack(false, errorMessage);
			}
		});
	}
}
