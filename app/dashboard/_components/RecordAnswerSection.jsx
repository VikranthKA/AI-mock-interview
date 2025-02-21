import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic, StopCircle } from 'lucide-react'
import { toast } from "sonner"
import { chatSession } from '../../../utils/GeminiAImodel'
import { db } from "../../../utils/db";
import { UserAnswer } from '../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

const RecordAnswerSection = ({ interviewData, mockInterviewQuestion, activeQuestionIndex }) => {
    const { user } = useUser()
    const [loading, setLoading] = useState(false)
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    const [userAnswer, setUserAnswer] = useState('')

    useEffect(() => {
        results.map((result) => (
            setUserAnswer(prevAns => prevAns + result?.transcript)
        ))
    }, [results])

    useEffect(() => {
        if (!isRecording && userAnswer.length > 6) {
            updateUserAnswer()
        }

    }, [userAnswer])

    const startStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText()
            // if (userAnswer?.length < 6) {
            //     setLoading(false)
            //     toast('Error while saving your answer, Please record again!.')
            //     return;
            // }


        } else {
            startSpeechToText()
        }
    }

    const updateUserAnswer = async () => {
        console.log('in ai prompt')

        setLoading(true)
        const feedbackPropmt = `Question ${mockInterviewQuestion[activeQuestionIndex]?.question} ,
                                User Answer: ${userAnswer} ,Depends on question and user answer for given interview question ,
                                please give use rating for answer and feedback as area of improvement if any ,
                                in just 3 to 5 lines to improve it in JSON format with rating field and feebback field `

        const result = await chatSession.sendMessage(feedbackPropmt)
        const mockJsonResp = result.response.text().replace('```json', '').replace('```', '')
        const jsonFeedbackRatingResp = JSON.parse(mockJsonResp)

        const addRecordToDB =await db.insert(UserAnswer)
            .values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: jsonFeedbackRatingResp?.feedback,
                rating: jsonFeedbackRatingResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-yyyy')
            })

        console.log(addRecordToDB,"db")

        if (addRecordToDB) {
            toast('Answer recorded successfully!')
            setUserAnswer('')
            setLoading(false)
            setResults([])
        }
        setResults([])
        setLoading(false)



    }
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
                        height: 300,
                        width: '100%',
                        zIndex: 10

                    }}

                />



            </div>
            <Button variant='outline'
                disable={loading ? 'true' : 'false'}
                className='left-2 bg-green-200'
                onClick={
                    startStopRecording
                }>
                {isRecording
                    ?
                    <h2 className="flex gap-2 text-red-600">

                        <Mic className='text-base animate-pulse ' /> Stop Audio Recording
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
