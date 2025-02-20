import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionSection = ({mockInterviewQuestion,activeQuestionIndex}) => {
  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech =new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    }else{
      alert('Sorry ,Your browser does not support text to speech')
    }
  }
  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>

        {mockInterviewQuestion.map((question,index)=>{
           return <h2 key={index} className={`p-2 bg-secondary rounded-full cursor-pointer text-xs md:text-sm text-center ${activeQuestionIndex===index ? `bg-blue-700 text-white`:``}`}>Question #{index+1}</h2>
        })} 
        </div>


        <h2 className="my-5 text-sm md:text-base">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <section className='flex mb-5 gap-1 cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}>


        <Volume2 className=' ' />Listen
        </section>
        <div className="border rounded-lg p-5 bg-blue-100">
          <h2 className="flex gap-2 items-center text-blue-300 animate-pulse">
            <Lightbulb/>
            <strong className="">
Information
            </strong>
          </h2>
          <h2>
          Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview,It has 5 questions which you can answer and at the last you will get report on the basis of your answer.
        <br />
        <span className="text-base text-red-400">

            NOTE: We never recored your video ,Web cam access you can disable at any time if you want
        </span>
          </h2>
        </div>
      
    </div>
  )
}

export default QuestionSection
