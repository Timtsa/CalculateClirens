import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Clirens } from '../Model/clirens';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']
})

export class CalculateComponent implements OnInit {

  baseUrl = 'https://localhost:7083/';
  values: Clirens;
  result: any;
  nextCheck:any;
  sex='';
  showResult =false;
 ;
  constructor(private http: HttpClient) { 
    this.values= {age: 0, blod:0,weight:0, female:false}
  }



  ngOnInit(): void {
    if(!this.values.female)
    this.sex=' мужской';
  }

 chengeImage(){
  console.log("any");
  var blok =document.getElementById("myBody");
  if(blok!==null)
  blok.style.backgroundImage="url('./assets/pic2.jpg')";
 }

  makeCalculate()
  {
   this.result = ((140-this.values.age)*this.values.weight)/(this.values.blod*72);
   if(this.values.female){
    this.result=this.result*0.85;
  }
   this.nextCheck =Math.round(this.result/10);
   this.showResult=true;
   return this.result=this.fixRound(this.result,2);     
  }

  private fixRound(result:number, dbs:number)
  {
    let missing = '';
    if(result<0) missing='-';
    let x =Math.abs(result);
    if(x>Math.pow(10,21)) return missing+x.toString();
    let m =Math.round(x*Math.pow(10,dbs)).toString();
    if(dbs===0)return missing+m;
    while(m.length<=dbs) m="0"+m;
    return missing + m.substring(0, m.length-dbs)+"."+m.substring(m.length-dbs);
  }
  
  public chek(){
    this.values.female = !this.values.female;
    if(this.values.female)
    this.sex=' женский'
   if(!this.values.female)
    this.sex=" мужской"
    console.log(this.values.female);
  }

  public resetForm(){
    this.values= {age: 0, blod:0,weight:0, female:false}
    this.showResult=false;
  }

}
