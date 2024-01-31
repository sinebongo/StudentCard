import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(private router : ActivatedRoute, private pservice : NgxPhotoEditorService){
  }

  @ViewChild('contents', {static:true}) el! : ElementRef<HTMLImageElement>

  name: string;
  surname : string;
  grade: string;
  studentNo : string;
  link: string;

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


}
