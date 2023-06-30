import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { Authorities } from 'src/app/guards/authorities';
import { modalConfigs } from 'src/app/settings/modal.settings';
import { BanksService } from '../../services/banks.service';
import { NotifierService } from 'angular-notifier';
import { DeleteBankComponent } from '../../components/delete-bank/delete-bank.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-bank',
  templateUrl: './form-bank.component.html',
  styleUrls: ['./form-bank.component.scss']
})
export class FormBankComponent {

  bankForm: FormGroup;
  editMode: boolean = false;
  hasDisabledForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notifier: NotifierService,
    private authorities: Authorities,
    private banksService: BanksService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
  ) {
    this.hasDisabledForm = this.hasPermission('ROLE_BANCO_EDT');
    this.bankForm = this.fb.group({
      codigo: [{ value: '', disabled: this.hasDisabledForm }, [Validators.required, Validators.minLength(3), Validators.maxLength(3)], ],
      descricao: [{ value: '', disabled: this.hasDisabledForm },  Validators.required],
      id: [0,  Validators.required],
      statusId: [{ value: 'A', disabled: this.hasDisabledForm },  Validators.required],
      status: this.fb.group({
        id: ['A',  Validators.required],
        descricao: ['Ativo',  Validators.required]
      })
    });
    this.activatedRoute.params.subscribe(params => {
      if(params['id']) {
        this.editMode = true;
        this.getBankById(params['id']);
      }
    });
  }

  handleSelectStatus(event: any): void {
    this.bankForm.patchValue({
      status: {
        id: event.target.value,
        descricao: event.target.value === 'I' ? 'Inativo' : 'Ativo',
      }
    });
    
  }

  createBank(): void {
    this.bankForm.removeControl('statusId');
    this.banksService.createBank(this.bankForm.value, (status, response) => {
      if(status) {
        this.router.navigate(['/dashboard/banks']);
        this.notifier.notify('info', 'Operação realizada com sucesso!');
      } else {
        this.notifier.notify('error', response.mensagemUsuario);
      }
    });
  }

  updateBank(): void {
    this.bankForm.removeControl('statusId');
    this.banksService.updateBank(this.bankForm.value, (status, response) => {
      if(status) {
        this.router.navigate(['/dashboard/banks']);
        this.notifier.notify('info', 'Operação realizada com sucesso!');
      } else {
        this.notifier.notify('error', response.mensagemUsuario);
      }
    });
  }

  openModalDeleteBank(): void {
    const modalRef = this.modalService.open(DeleteBankComponent, modalConfigs);
    modalRef.componentInstance.selectedBanks = [this.bankForm.value.id];
    modalRef.result.then((result) => {
      if(result) {
        this.router.navigate(['/dashboard/banks']);
      };
    });
	}

  getBankById(id: number): void {
    this.banksService.getBankById(id, (status, response) => {
      if(status) {
        this.bankForm.patchValue({
          codigo: response.codigo,
          descricao: response.descricao,
          id: response.id,
          statusId: response.status.id,
          status: {
            id: response.status.id,
            descricao: response.status.descricao,
          }
        });
      } else {
        this.notifier.notify('error', response.mensagemUsuario);
      }
    });
  }

  hasPermission(role: string): boolean {
    return !this.authorities.hasPermission(role);
  }
}
