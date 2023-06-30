import { BanksService } from '../../services/banks.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-bank',
  templateUrl: './delete-bank.component.html',
  styleUrls: ['./delete-bank.component.scss']
})
export class DeleteBankComponent {

  @Input() selectedBanks: string[] = [];

  constructor (
    public activeModal: NgbActiveModal, 
    private notifier: NotifierService,
    private banksService: BanksService,
  ) {}

  handleDelete(): void {
    Promise.all(
      this.selectedBanks.map(id => {
        return new Promise((resolve) => {
          this.banksService.deleteBanksList(id, (status, response) => {
            resolve(status);
          });
        })
      })
    )
    .then(() => {
      this.activeModal.close(true);
      this.notifier.notify('info', 'Operação realizada com sucesso!');
    }).catch(() => this.notifier.notify('error', 'Um ou mais bancos apresentou erro durante o processo de remoção.'));
  }
  
}
