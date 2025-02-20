import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic, StopCircle } from 'lucide-react'

const RecordAnswerSection = () => {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      
      const [userAnswer,setUserAnswer] = useState('')
      useEffect(()=>{
        results.map((result)=>(
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        ))
      },[results])
  return (
    <div className="flex flex-col">
        <div className='flex flex-col justify-center items-center bg-secondary rounded-lg p-5 my-10 '>
            <Image
            alt='image'
            className='absolute'
            width={399}
            height={600}
            src={`https://cdn.pixabay.com/photo/2022/04/03/18/28/webcam-7109621_1280.png`}

            />
            <Webcam
            mirrored={true}
            style={{
                height:300,
                width:'100%',
                zIndex: 10

            }}
            
            />


        
        </div>
        <Button variant='outline' className='left-2 bg-green-200 
            
        '
        onClick={isRecording?stopSpeechToText:startSpeechToText}>{isRecording
        ?
        <h2 className="flex gap-2 text-red-600">
            
            <Mic className='text-base animate-pulse '/> Stop Audio Recording  
        </h2>
        :
        `Record Answer`
        }
        </Button>
        {/* <div>
      <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div> */}
    </div>
  )
}

export default RecordAnswerSection
