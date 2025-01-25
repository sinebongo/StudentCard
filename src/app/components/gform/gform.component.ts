import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gform',
  templateUrl: './gform.component.html',
  styleUrls: ['./gform.component.scss']
})
export class GFormComponent {

  constructor(private router : Router){

  }
  url = "https://docs.google.com/forms/d/1m3hZp4VOTL-cCdARU72_67c8bwV2G2twCeDHzhuS0IQ/prefill"

  grades = ['9', '10', '11', '12','Stuff'];
  
  FirstName: string = '';
  LastName: string = '';
  Grade: string = '';
  

  onSubmit() {
    if (this.FirstName && this.LastName && this.Grade) {
      const link = new URL('https://docs.google.com/forms/d/e/1FAIpQLScy4c2ct8k4xO1V1FOErG3DF8bdBxrwfELkm5Vop-ncRsuXhw/viewform');
      const myLinkParam = new URLSearchParams();
      
      myLinkParam.set('entry.396603015', this.FirstName);
      myLinkParam.set('entry.649425521', this.LastName);
      myLinkParam.set('entry.1507274521', this.Grade);
      
      link.search = myLinkParam.toString();
      
      this.router.navigate(['card'], {
        queryParams: {
          name: this.FirstName,
          surname: this.LastName,
          grade: this.Grade,
          link: link.toString()
        }
      });
    } else {
      alert('Form is invalid');
    }
  }
}
