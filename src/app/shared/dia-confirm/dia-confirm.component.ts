import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dia-confirm',
  templateUrl: './dia-confirm.component.html',
  styleUrls: ['./dia-confirm.component.scss']
})
export class DiaConfirmComponent implements OnInit{
  constructor(public dialogRef: MatDialogRef<DiaConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }
}
