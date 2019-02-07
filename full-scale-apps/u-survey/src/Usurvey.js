import React, {Component} from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var config = {
    apiKey: "AIzaSyDq7sJtcBDCyAaLMLRxpOVQaQeE2WQIowQ",
    authDomain: "usurvey-b589b.firebaseapp.com",
    databaseURL: "https://usurvey-b589b.firebaseio.com",
    projectId: "usurvey-b589b",
    storageBucket: "usurvey-b589b.appspot.com",
    messagingSenderId: "1081624325322"
  };
  firebase.initializeApp(config);

class Usurvey extends Component{

    nameSubmit(event){
        var studentName = this.refs.name.value;
        this.setState({studentName: studentName}, function(){
            console.log(this.state);
        });
    }

    answerSelected(event){
        var answers = this.state.answers;
        if(event.target.name === 'answer1'){
            answers.answer1 = event.target.value;
        } else if(event.target.name === 'answer2'){
            answers.answer2 = event.target.value;
        }else if(event.target.name === 'answer3'){
            answers.answer3 = event.target.value;
        }
        this.setState({answers: answers}, function(){
            console.log(this.state);
        });
    }

    questionSubmit(){
        firebase.database().ref('U-survey/'+this.state.uid).set({
            studentName: this.state.studentName,
            answers: this.state.answers
        });
        this.setState({isSubmitted: true});
    }

    constructor(props){
        super(props);

        this.state = {
            uid: uuid.v1(),
            studentName: '',
            answers: {
                answer1: '',
                answer2: '',
                answer3: ''
            },
            isSubmitted: false
        };
        this.nameSubmit = this.nameSubmit.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.questionSubmit = this.questionSubmit.bind(this);
    }
    
    render(){
        var studentName;
        var questions;

        if(this.state.studentName === '' && this.state.isSubmitted === false){
            studentName = <div>
                <h1>Please Enter Your Name: </h1>
                <form onSubmit={this.nameSubmit}>
                    <input className="StudentName" type="text" placeholder="Your Name" ref="name"/>
                </form>
            </div>;
            questions = ''
        } else if (this.state.studentName !== '' && this.state.isSubmitted === false){
            studentName = <h1>Hi {this.state.studentName}, welcome to U-Survey</h1>;
            questions = <div>
                <h2>Please answer the questions below: </h2>
                <form onSubmit={this.questionSubmit}> 
                    <div className="card">
                        <label> Do you think I am Cute?: </label>
                        <br/>
                        <input type="radio" name="answer1" value="Yes" onChange={this.answerSelected}/>Yes
                        <input type="radio" name="answer1" value="Yesyes" onChange={this.answerSelected}/>Yes 100% yes!
                        <input type="radio" name="answer1" value="Yesguess" onChange={this.answerSelected}/>Yes I guess...
                    </div>
                    <div className="card">
                        <label> Do you like the Kardashians?: </label>
                        <br/>
                        <input type="radio" name="answer2" value="Yes" onChange={this.answerSelected}/>Yes
                        <input type="radio" name="answer2" value="No" onChange={this.answerSelected}/>No
                    </div>
                    <div className="card">
                        <label> Have you ever at one point given someone free reign to your butthole and then denied that person his reward?: </label>
                        <br/>
                        <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected}/>Yes
                    </div>
                    <input className="feedback-button" type="submit" value="submit"></input>
                </form>
            </div>
        }   else if(this.state.isSubmitted === true && this.state.studentName !== ''){
            studentName = <h1>Thanks, {this.state.studentName}</h1>
        }

        return(
            <div>
                {studentName}
                -------------------------------
                {questions}

            </div>
        );
    }
}

export default Usurvey;