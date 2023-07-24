import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {

  constructor(private router: Router){

  }


  Link!: URL;
  disableBtn=false;
  myLinkParam: URLSearchParams = new URLSearchParams('');
  linkFields :string ='';

  FirstName : string ='no name';
  LastName : string='no Surname';
  Grade : string ='';

  saveData(form : NgForm){
    this.Link = new URL(form.value.link)
    this.myLinkParam = new  URLSearchParams(this.Link.search)

    this.FirstName = this.myLinkParam.get('entry.396603015')
    this.LastName = this.myLinkParam.get('entry.649425521')
    this.Grade = this.myLinkParam.get('entry.1507274521')
    //console.log(this.Link)

    this.router.navigate(['card'], {queryParams: {name : this.FirstName, surname : this.LastName, grade: this.Grade, link: this.Link}})
}
}
