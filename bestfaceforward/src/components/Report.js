// TODO: Analyze audio for speed/clarity/pacing on recrded mp4 file and display here

//TODO: analyze transcript in "txt" variable for filler words/ no-no words/ ramblng

//index.js


import React, { Component } from 'react';
import axios from 'axios'
import {Button, Card, Row, Col} from 'react-bootstrap';
import {RadarChart, Radar, PolarGrid, PolarRadiusAxis, PolarAngleAxis, Sector, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';


class Report extends Component {
  constructor(props){
    super(props);

    this.state = {
      txt: "When Working on my um group project, a team member um was not carrying their own weight. They weren't completing assingments or showing up to meetings. To solve the problem we were direct with them in a positive wayy and tried to work with them in person",
      analysis: [
                  {
                    tone_name: 'Anger', score: 0
                  },
                  {
                    tone_name: 'Fear', score: 0
                  },
                  {
                    tone_name: 'Joy', score: 0
                  },
                  {
                    tone_name: 'Sadness', score: 0
                  },
                  {
                    tone_name: 'Analytical', score: 0
                  },
                  {
                    tone_name: 'Confident', score: 0
                  },
                  {
                    tone_name: 'Tentative', score: 0
                  }
                ],
      filler: 0,
      keywords: [{keyword: '1', score: 0.1},
                  {keyword: '2', score: 0.1},
                  {keyword: '3', score: 0.1}]
    }
  }

  //get number of occurances in an array of a specific value
  getOccurrence = (array, value) => {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
  }

  getSubjects = (ev) => {
    ev.preventDefault()
    var txt = this.state.txt.toLowerCase()
    axios.post('http://localhost:3001/api/subjects', {transcript: this.state.txt})
   .then(res => {
     console.log("Response: ",res)
     var keywords = res.data.analysisResults.result.keywords
     var finalKeywords = [ {keyword: '1', score: 0.1},
                 {keyword: '2', score: 0.1},
                 {keyword: '3', score: 0.1}
               ]
     var concepts = res.data.analysisResults.result.concepts
     var finalConcepts = [ {concept: '1', score: 0.1},
                 {concept: '2', score: 0.1},
                 {concept: '3', score: 0.1}
               ]
    var current = 0
     for (var i of keywords){
       finalKeywords[current].keyword = i.text
       finalKeywords[current].score = i.relevance
       current+=1
     }
     console.log(finalKeywords)
     this.setState({
       keywords: finalKeywords
     })
   })
  }

  analyzeText = (ev) => {
    ev.preventDefault()

    var txt = this.state.txt.toLowerCase()
    var words = txt.split(" ")
    var wordArray = Object.values(words)

    this.setState({filler: this.getOccurrence(wordArray, 'um')})



    //Post call to backend for analysis of transcript
    axios.post('http://localhost:3001/api/transcript', {transcript: this.state.txt})
   .then(res => {

     //Gets analysis from backend
     // var tones = res.data.toneAnalysis.result.document_tone.tones
     // for (var tone in analysis){
     //   if (tone.hasOwnProperty(tone)){
     //     tone.score
     //   }
     // }
     console.log(res.data.toneAnalysis.result.document_tone.tones)
     var tones = res.data.toneAnalysis.result.document_tone.tones
     var finalTone = [ {tone_name: 'Anger', score: 0.1},
                 {
                   tone_name: 'Fear', score: 0.1
                 },
                 {
                   tone_name: 'Joy', score: 0.1
                 },
                 {
                   tone_name: 'Sadness', score: 0.1
                 },
                 {
                   tone_name: 'Analytical', score: 0.1
                 },
                 {
                   tone_name: 'Confident', score: 0.1
                 },
                 {
                   tone_name: 'Tentative', score: 0.1
                 }
               ]
     for (var i of tones){
       for (var a of finalTone){
         if (a.tone_name == i.tone_name){
           a.score = i.score
         }
       }
     }
     console.log(finalTone)
     this.setState({
       analysis: finalTone
     })
     //console.log(res.data.toneAnalysis.result);
     //console.log(this.state.analysis)
   })
  }




  render(){
    return(
      <div>
        <Button onClick={this.analyzeText}>Analyze</Button>
        <Button onClick={this.getSubjects}>Get Subjects</Button>
        <Row>
          <Col sm={6}>
            <Card>
              <Card.Header as="h3">Tone Analysis</Card.Header>
              <Card.Body>
                <Card.Text>
                  <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={this.state.analysis}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="tone_name"/>
                    <PolarRadiusAxis />
                    <Radar name="score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={2}>
            <Card>
              <Card.Header as="h3">Filler Count</Card.Header>
              <Card.Body>
                <Card.Text as="h4">
                  <div>Numer of Filler Words: {this.state.filler}</div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <BarChart
              width={500}
              height={300}
              data={this.state.keywords}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="keyword" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </Col>
          </Row>

        <div>{this.state.txt}</div>

      </div>
    );
  }

}

export default Report;
