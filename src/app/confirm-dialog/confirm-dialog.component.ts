import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.sass']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() title = '';
  @Input() message = '';

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmarDialogModel)
  {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void
  {
  }

  onConfirmar(): void
  {
    this.dialogRef.close(true);
  }

  onCancelar(): void
  {
    this.dialogRef.close(false);
  }
}

export interface ConfirmarDialogModel
{
  title: string;
  message: string;
}
