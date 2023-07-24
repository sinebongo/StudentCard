import { Component } from '@angular/core';
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

  redirect(){
    this.router.navigateByUrl('Link')
    window.open(this.url, '_blank');
  }

}
