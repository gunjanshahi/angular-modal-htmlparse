import {Component, Renderer2} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'dialog-content-example',
  templateUrl: 'dialog-content-example.html',
  styleUrls: ['dialog-content-example.css'],
})
export class DialogContentExample {
  headerTitles = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  constructor(public dialog: MatDialog, private renderer: Renderer2) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.afterOpened().subscribe(result => {
      const dialogEl = dialogRef['_containerInstance']['_elementRef'].nativeElement;
      if (!dialogEl.querySelector('[mat-dialog-title]')) {
        
        const title  = this.findTitleElement(dialogEl);
        if (title) {
          dialogRef._containerInstance._ariaLabelledBy = '1234'
          this.renderer.setAttribute(title, 'id', '1234')
        } 
      } else {
        console.log('already have title');
      }
    });
    
  }

  findTitleElement(dialogEl:any, index: number = 0): any {
    if(index === this.headerTitles.length) {
      return null;
    }
    const titleEl = dialogEl.querySelector(this.headerTitles[index]);
    return titleEl ? titleEl : this.findTitleElement(dialogEl, index+1);
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */