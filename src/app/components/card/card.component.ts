import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(private router : ActivatedRoute, private pservice : NgxPhotoEditorService, private route : Router){
  }

  @ViewChild('contents', {static:true}) el! : ElementRef<HTMLImageElement>

  name: string;
  surname : string;
  grade: string;
  studentNo : string;
  link: string;
  url = "https://docs.google.com/forms/d/1m3hZp4VOTL-cCdARU72_67c8bwV2G2twCeDHzhuS0IQ/prefill"

  output? : NgxCroppedEvent

  ngOnInit(): void {
    this.router.queryParams.subscribe((param) => {
      this.name = param['name'];
      this.surname = param['surname'],
      this.grade= param['grade'];
      this.studentNo = param['studentNo'];
      this.link = param['link'].toString().replace('viewform','formResponse').concat('&submit=Submit')
    });

  }

  ExportToPdf(){
    html2canvas(this.el.nativeElement).then((canvas)=>{
      const a = document.createElement("a")
      a.href = canvas.toDataURL('image/jpeg')
      a.download =  `${this.name}.png`;
      a.click();
    })
  }

  onFileChange($event : any){
    this.pservice.open($event,{aspectRatio: 4/3, autoCropArea:1,}).subscribe((data)=>{
      this.output =data
    })
  }

  BackTohome(){
    const ok =window.confirm('Are you sure you want to exit? The data you have wont be saved');
    if(ok){
      this.route.navigate(['/Home'])}
  }
}``
