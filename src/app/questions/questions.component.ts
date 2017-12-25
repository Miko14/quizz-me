import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

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
  textInput: string;

  questionType: string;

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

  correctAnswers: string[] = [
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
    this.questions.splice(0, this.questions.length);
    this.answersBank.splice(0, this.answersBank.length);
    this.correctAnswers.splice(0, this.correctAnswers.length);
    this.initializeContent();
  }

  initializeContent(): void {
    this.questions = [
      "Akej farby je obloha?",
      "Aky deň je prvý v týždni?",
      "Koľko dní má december?"
    ];
    this.answersBank = [
      "modrá", "červená", "zelená", "fialová",
      "utorok", "streda", "pondelok", "sobota",
      "25", "30", "29", "31"
    ];
    this.correctAnswers = [
      "modrá", "pondelok", "31"
    ];
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

  readFile(inputFileValue: any): void {
    var file: File = inputFileValue.files[0]; 
    var myReader: FileReader = new FileReader();

    // myReader.onloadend = function(e){
    //   console.log(myReader.result);
    // }

    myReader.onloadend = () => {
      this.textInput = myReader.result;
      // console.log('===========================================================================')
      // console.log(this.textInput);
      // console.log('JSON PARSE: ');
      // console.log(JSON.parse(this.textInput));
      console.log('QQQQQQQQQQQQQQQQQQQQ:');
      console.log(this.isJsonString(this.textInput));

      /**
       * checks if text from file is a valid JSON string
       * then parse it according to specific structure
       */
      if (this.isJsonString(this.textInput)) {
        let result = JSON.parse(this.textInput);
        this.questions.splice(0, this.questions.length);
        this.answersBank.splice(0, this.answersBank.length);
        this.correctAnswers.splice(0, this.correctAnswers.length);
        this.answers.splice(0, this.answers.length);
        console.log(this.questions);
        console.log(this.answersBank);
        console.log(this.correctAnswers);
        console.log(this.answers);
        _(result.questions).forEach(item => {
          this.questions.push(item.question);
          this.questionType = item.questionType;
          _(item.answers).forEach(element => {
            this.answersBank.push(element);
          });
          _(item.correctAnswers).forEach(element => {
            this.correctAnswers.push(element);
          });
        });

        console.log('INITIALIZE ANSWERS only ONCE - must be fixed');
        this.initializeAnswers();
        console.log("aaa");
        console.log(result);
        console.log('=====================================================')
        console.log(this.questions);
        console.log(this.answersBank);
        console.log(this.correctAnswers);
      }

    }
    
    myReader.readAsText(file);
    
  }

  isJsonString(str): boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

  submitAnswer(): void {
    if (this.selectedAnswer == this.correctAnswers[this.number - 1]) {
      this.score++;
    }
    if (this.number == this.questions.length) {
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
