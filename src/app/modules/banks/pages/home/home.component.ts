import { Banks } from '../../models/banks.interface';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Authorities } from 'src/app/guards/authorities';
import { BanksService } from '../../services/banks.service';
import { modalConfigs } from 'src/app/settings/modal.settings';
import { Component, OnInit } from '@angular/core';
import { DeleteBankComponent } from '../../components/delete-bank/delete-bank.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  page: number = 0;
  banks: Banks[] = [];
  totalPages: number = 0;
  searchString: string = '';

  selectedBanks: string[] = [];

  constructor(
    private router: Router,
    private authorities: Authorities,
    private modalService: NgbModal,
    private banksService: BanksService,
  ) { }

  ngOnInit(): void {
    this.getBanks(this.page);
  }

  counter() {
    return new Array(this.totalPages);
  }

  getBanks(page: number): void {
    this.banksService.getBanks(page, this.searchString, (status, response) => {
      if(status) {
        this.page = page;
        this.banks = response.content;
        this.totalPages = response.totalPages;
      }
    });
  }

  searchBanks(): void {
    this.getBanks(0);
  }

  handleCheckChange(event: any): void {
    if(event.target.checked) {
      this.selectedBanks.push(event.target.value);
    } else {
      const index = this.selectedBanks.indexOf(event.target.value);
      if(index > -1) {
        this.selectedBanks.splice(index, 1);
      }
    }
  }

  openModalDeleteBank(): void {
    const modalRef = this.modalService.open(DeleteBankComponent, modalConfigs);
    modalRef.componentInstance.selectedBanks = this.selectedBanks;
    modalRef.result.then((result) => {
      if(result) this.ngOnInit();
    });
	}

  navigateToDetail(id: number): void {
    this.router.navigate([`/dashboard/banks/${id}`]);
  }

  hasPermission(role: string): boolean {
    return !this.authorities.hasPermission(role);
  }

}
