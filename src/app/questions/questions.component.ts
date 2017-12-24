import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  number: number = 1;
  index: number = 0;

  questions: string[] = [
    "Akej farby je obloha?",
    "Aky deň je prvý v týždni?",
    "Koľko dní má december?"
  ];

  answers: string[] = [
    "modrá", "červená", "zelená", "fialová",
    "utorok", "streda", "pondelok", "sobota",
    "25", "30", "29", "31"    
  ];

  constructor() { }

  ngOnInit() {
  }

  submitAnswer(): void {
    this.number++;
    this.index += 4;
    if (this.number == 3){
      this.number = 1;
      this.index = 0;
    }
  }

}
