import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { SuperhumanService } from './superhuman.service';
import { Superhuman } from './superhuman';

@Component({    
    selector: 'app-superhuman',
    templateUrl: './superhuman.component.html',
    styleUrls: ['./superhuman.component.css'],
    inputs:['activeColor','baseColor','overlayColor']  
})
export class SuperhumanComponent implements OnInit {

    constructor(private _superhumanService: SuperhumanService, private elem: ElementRef, private renderer: Renderer) { }
  
    superhumans: Array<Superhuman> = [];
    supersplits: Array<Superhuman> = [];  
    supertemp: Array<Superhuman> = [];  
    
    editPostaccess: string = "";
  
    newSuperhumanActive: Boolean = false;
    editSuperhumanActive: Boolean = false;
    
    newSuperhuman = new Superhuman();
    editSuperhuman = {};
    backSuperhuman = {};
  
    filename: string = "";
    oldname: string = "";
    fileUrl: string = "";
  
    filterby: string = "all";
    filterActive: Boolean = false;
    prevNextActive: Boolean = false;    
  
    perPage: number = 4;
    pageNumber: any = [];
    pageActive: Boolean = false; 
    pageValue: number = 0;    

    dangerActive: Boolean = false;
    textMsg: string = "";

    sizeLimit: number = 10000;
    imageSizeLimit: number = this.sizeLimit * 1024;
    _author: string = "vtapia.jr@gmail.com";
      
    ngOnInit() {
        this.listSuperhumans();
    }
  
    showFilter() {
        this.filterActive = true;    
    }
  
    submitFilter() {
        this.resetSuperhuman();    
        this.pageNumber = [];    
        this.filterActive = false;    
        this.listSuperhumans();  
      }
  
    listSuperhumans() {
        this.newSuperhuman = new Superhuman();     
        this.spinOnandOff('#data_spinner','#data_message','visible');                                                                        
        this._superhumanService.getSuperhumans(this.filterby).subscribe(res=> this.dataListing(res));
        let content = this.elem.nativeElement.querySelector('#super-human-box');         
        content.scrollIntoView(true);   
      }
  
    showNewSuperhuman() {
        this.resetSuperhuman(); 
        // this.filterActive = false;
        this.newSuperhuman = new Superhuman();
        this.newSuperhumanActive = true;
    }
  
    saveNewSuperhuman(superhuman: Superhuman) {    
        let files = this.elem.nativeElement.querySelector('#selectNewFile').files;
        let file = files[0];
    
        if (file) {    
            var pattern = /image-*/;
            if (file.type.match(pattern)) {
                      
                let formData = new FormData();
                formData.append('selectFile', file, file.name);
            
                let ext = file.name.substr(file.name.lastIndexOf('.'));
          
                this.oldname = superhuman.name + ext;
                this.filename = "0_" + superhuman.name + ext;
                
                formData.append('oldName', this.oldname);
                formData.append('newName', this.filename);

                superhuman.imageurl = this.filename;  
                
                this.spinOnandOff('#image_spinner','#image_message','visible');                                            
                this._superhumanService.uploadSuperhuman(formData).subscribe(res=> this.imageNewLoading(res, superhuman));      
                
            } else {
                alert("Sorry! File being uploaded is not an image. Please try again!");
                let resetForm = this.elem.nativeElement.querySelector('#myForm');
                resetForm.reset();    
            }      
        } else {
            alert("Sorry! Saving a post is not allowed without an image. Please try again!");
            let resetForm = this.elem.nativeElement.querySelector('#myForm');
            resetForm.reset();    
        }   
    }
  
    private imageNewLoading(data: any, superhuman): void {
        let formData = new FormData();
        formData.append('imageName', this.filename);
        this._superhumanService.resizeSuperhuman(formData).subscribe(res=> this.imageNewResizing(res, superhuman));   

    }    

    private imageNewResizing(data: any, superhuman): void {        
        this.filterby = "all";
        this.spinOnandOff('#image_spinner','#image_message','hidden');                                                    
        this.spinOnandOff('#data_spinner','#data_message','visible');                                            
        this._superhumanService.createSuperhuman(superhuman).subscribe(res=> this.dataNewProgress(res));      
    }

    private dataNewProgress(data: any): void {        
        this.spinOnandOff('#data_spinner','#data_message','hidden');                                                    
        let resetForm = this.elem.nativeElement.querySelector('#myForm');
        resetForm.reset();   

        this.listSuperhumans();         
    }     
  
    showEditSuperhuman(superhuman: Superhuman) {
        this.resetSuperhuman();    
        // this.filterActive = false;    
        this.editPostaccess = "";
        Object.assign(this.editSuperhuman,superhuman);    
        this.fileUrl = superhuman.imageurl.substr(superhuman.imageurl.lastIndexOf('/')+1);
        this.editSuperhumanActive = true;
    }
  
    saveEditSuperhuman(superhuman: Superhuman) {
        if(this.editPostaccess == superhuman.postaccess) {
            let files = this.elem.nativeElement.querySelector('#selectOldFile').files;
            let file = files[0];
      
            if (file) {
              
                var pattern = /image-*/;
                if (file.type.match(pattern)) {
                    let formData = new FormData();
                  
                    formData.append('selectFile', file, file.name);
              
                    let extNew = file.name.substr(file.name.lastIndexOf('.'));
                    this.filename = superhuman.name + extNew;
        
                    let extOld = superhuman.imageurl.substr(superhuman.imageurl.lastIndexOf('.'));
                    let url = superhuman.imageurl.substr(superhuman.imageurl.lastIndexOf('/')+1);
                    let num = url.split("_");
                  
                    let val = num[0];
                    if(num[0] == url) val = ""; 
        
                    if(val=="") {
                        this.oldname = superhuman.name + extOld;
                        this.filename = "0_" + superhuman.name + extNew;            
                    } else {
                        this.oldname = val + "_" + superhuman.name + extOld;
                        let newval = +val + 1;
                        this.filename = newval + "_" + superhuman.name + extNew;
                    }
                  
                    formData.append('oldName', this.oldname);      
                    formData.append('newName', this.filename);
        
                    superhuman.imageurl = this.filename;                      

                    this.spinOnandOff('#image_spinner','#image_message','visible');                                                                
                    this._superhumanService.uploadSuperhuman(formData).subscribe(res=> this.imageEditLoading(res, superhuman));                      
                }
            } else {
                this.callSaveEditSuperhuman(superhuman);
            }      
        } else {
            alert("Sorry! Changes made not posted. You're not the owner of this post... ");      
            let resetForm = this.elem.nativeElement.querySelector('#myForm');
            resetForm.reset();   
        }
    }
    
    checkImageInfo(event,id) {
        let upld = event.target;
        if(upld.files.length > 0) {
            let file = upld.files[0];
            if(file.size > this.imageSizeLimit) {
                this.textMsg = "Sorry!, File size " + file.size + " exceeds image upload limit..";
                this.dangerActive = true;
                this.setDelay();
                let img = "#" + id;
                this.elem.nativeElement.querySelector(img).value ='';      
            }           
        }
    }    

    setDelay() {
        setTimeout(() => 
        {
            this.dangerActive = false;
        }, 5000);  
    }     
  
    private imageEditLoading(data: any, superhuman): void {
        let formData = new FormData();
        formData.append('imageName', this.filename);
        this._superhumanService.resizeSuperhuman(formData).subscribe(res=> this.imageEditResizing(res, superhuman));                      
    }    

    private imageEditResizing(data: any, superhuman): void {
        this.spinOnandOff('#image_spinner','#image_message','hidden');                                            
        
        this.callSaveEditSuperhuman(superhuman);
        this.setDelay();             
    }
  
    private callSaveEditSuperhuman(superhuman) {  
        this.spinOnandOff('#data_spinner','#data_message','visible');                                            
        this._superhumanService.updateSuperhuman(superhuman).subscribe(res=> this.dataUpdateProgress(res));        
        
        let resetForm = this.elem.nativeElement.querySelector('#myForm');
        resetForm.reset();          
    }
  
    deleteSuperhuman(superhuman: Superhuman) {
        if(this.editPostaccess == superhuman.postaccess) {    
            this.spinOnandOff('#data_spinner','#data_message','visible');                                                        
            this._superhumanService.deleteSuperhuman(superhuman).subscribe(res=> this.dataDeleteLoading(res));
        } else {
            alert("Sorry! Delete not allowed. You're not the owner of this post... ");      
        }
    }  
  
    resetSuperhuman() {
        this.newSuperhumanActive = false;
        this.editSuperhumanActive = false;
        this.editSuperhuman = {}; 
        this.editPostaccess = "";  
    }    
  
    private dataListing(data: any): void {
        this.pageNumber = [];
        this.pageActive = false;
        
        this.supersplits = data.json();
        var count = this.supersplits.length;
        if(count > this.perPage) {
            count = this.perPage; 
        }
    
        this.superPush(0,count);
    
        let numPages = this.supersplits.length / this.perPage;
        let excessPage = (numPages % 1) * 100;
        numPages = Math.floor(numPages);
        
        if(excessPage > 0) numPages++;
        // if(excessPage > 0) numPages +=14;        

        this.prevNextActive = false;
        let changeWidth = 13 * 4;        
        numPages >= 15 ? this.prevNextActive = true : changeWidth = numPages * 3.5;        
        this.elem.nativeElement.querySelector('#pageNumber').style.width=changeWidth+"%";             
        
        for(var i=1; i<=numPages; i++) {
            this.pageNumber.push({'page':i});
        }
    
        this.pageValue = 1;            
        if(numPages > 1) {
            this.pageActive = true;                     
        }        
        this.spinOnandOff('#data_spinner','#data_message','hidden');   
        setTimeout(() => 
        {
            let pnum = "pageValue1";
            document.getElementById(pnum).style.backgroundColor = "blue";
        }, 100);          
               
    }

    private dataUpdateProgress(data: any): void {        
        this._superhumanService.getSuperhumans(this.filterby).subscribe(res=> this.dataUpdateLoading(res));       
        this.spinOnandOff('#data_spinner','#data_message','hidden');                                                                
    }  
  
    private dataUpdateLoading(data: any): void {
        this.supersplits = data.json();    
        this.superBegEnd();
    }  
  
    private pageClickNumber(pn) {
        this.spinOnandOff('#data_spinner','#data_message','visible');                                                                        
        this.resetSuperhuman();
        
        this.pageValue = pn;    
        this.superBegEnd();
    
        let content = this.elem.nativeElement.querySelector('#super-human-box');         
        content.scrollIntoView(true);    
        this.spinOnandOff('#data_spinner','#data_message','hidden'); 

        for(var i=0; i<this.pageNumber.length; i++) {
            let pnum = "pageValue"+this.pageNumber[i].page;
            document.getElementById(pnum).style.backgroundColor = "transparent";
        }  

        let pnum = "pageValue"+this.pageValue;
        document.getElementById(pnum).style.backgroundColor = "blue";
    }
  
    private superBegEnd() {
        let end = this.pageValue * this.perPage;
        let beg = end - this.perPage;
    
        var count = this.supersplits.length;
        if(end > count) {
            end = count; 
        }        
        this.superPush(beg,end);    
    }  
  
    private superPush(sFrom, sTo) {
        this.supertemp = [];
        for(var i=sFrom; i<sTo; i++) {
            this.supertemp.push(this.supersplits[i]);
        }      
        this.superhumans = this.supertemp;  
    }
      
    private dataDeleteLoading(data: any): void {
        this.spinOnandOff('#data_spinner','#data_message','hidden');                            
        this.listSuperhumans();    
    }

    private spinOnandOff(spin, msg, visi) {
        this.elem.nativeElement.querySelector(spin).style.visibility=visi;     
        this.elem.nativeElement.querySelector(msg).style.visibility=visi;                             
    }
  
}
