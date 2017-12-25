import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  number: number = 1;
  index: number = 0;
  score: number = 0;
  notFinished: boolean = true;

  questions: string[] = [
    "Akej farby je obloha?",
    "Aky deň je prvý v týždni?",
    "Koľko dní má december?"
  ];

  answers: string[] = [];
  selectedAnswer: string;
  answersBank: string[] = [
    "modrá", "červená", "zelená", "fialová",
    "utorok", "streda", "pondelok", "sobota",
    "25", "30", "29", "31"
  ];

  correctAnswer: string[] = [
    "modrá", "pondelok", "31"
  ];

  constructor() { }

  ngOnInit() {
    this.initialization();
    this.initializeAnswers();
  }

  initialization(): void {
    this.number = 1;
    this.index = 0;
    this.score = 0;
    this.notFinished = true;
    this.answers.splice(0, this.answers.length);
  }

  initializeAnswers(): void {
    this.answers.push(this.answersBank[0]);
    this.answers.push(this.answersBank[1]);
    this.answers.push(this.answersBank[2]);
    this.answers.push(this.answersBank[3]);
  }

  onKeyUp(): void {
    this.submitAnswer();
  }

  submitAnswer(): void {
    if (this.selectedAnswer == this.correctAnswer[this.number - 1]) {
      this.score++;
    }
    if (this.number == 3) {
      this.notFinished = false;
    } else {
      this.number++;
      this.index += 4;
      this.answers.splice(0, this.answers.length);
      this.answers.push(this.answersBank[this.index]);
      this.answers.push(this.answersBank[this.index + 1]);
      this.answers.push(this.answersBank[this.index + 2]);
      this.answers.push(this.answersBank[this.index + 3]);
    }
    this.selectedAnswer = "";
  }

  reset(): void {
    this.notFinished = true;
    this.initialization();
    this.initializeAnswers();
    this.selectedAnswer = "";
  }
  
}
