import {Component, Inject} from '@angular/core';
import {MatDialog, MatFormField, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */

@Component({
  selector: 'confirm-modal.component',
  templateUrl: 'confirm-modal.component.html',
})
export class ConfirmModalComponent {
  member = {};
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.member = data.member;
    }

  close(): void {
    this.dialogRef.close();
  }
  
  save(): void {
    console.log('modal member: ', this.member);
    this.dialogRef.close(this.member);
  }
  

}