import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CallBackRequest, RequestService } from 'src/app/services/request.service';
import { Banks } from '../models/banks.interface';

@Injectable({
  providedIn: 'root'
})
export class BanksService extends RequestService {

  constructor(
    protected override http: HttpClient,
    protected override router: Router,
  ) { 
    super(http, router);
  }

  getBanks(page: number, searchString: string, callback: CallBackRequest<any>): void {
    this.getRequest(`/bancos?sort=id&pageNumber=${page}&descricao=${searchString}`, (status, response) => {
      status ? callback(true, response) : callback(false, response);
    });
  }

  getBankById(id: number, callback: CallBackRequest<any>): void {
    this.getRequest(`/bancos/${id}`, (status, response) => {
      status ? callback(true, response) : callback(false, response);
    });
  }

  createBank(payload: Banks, callback: CallBackRequest<any>): void {
    this.postRequest('/bancos', payload, (status, response) => {
      status ? callback(true, response) : callback(false, response);
    });
  }

  updateBank(payload: Banks, callback: CallBackRequest<any>): void {
    this.putRequest(`/bancos/${payload.id}`, payload, (status, response) => {
      status ? callback(true, response) : callback(false, response);
    });
  }

  deleteBanksList(id: string, callback: CallBackRequest<any>): void {
    this.deleteRequest(`/bancos/${id}`, (status, response) => {
      status ? callback(true, response) : callback(false, response);
    });
  }
}
