'use client';
import React, { use, useEffect ,useState} from 'react'
import { db } from '../../../../../utils/db'
import { UserAnswer } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "../../../../../components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { useRouter } from 'next/navigation';
  

const Feedback = ({params}) => {
    const router = useRouter()
    const [feedback,setFeedback] = useState([])
    const { interviewId } = use(params); // Unwrap paramse
    useEffect(()=>{getFeedback()},[interviewId])
    const getFeedback = async()=>{
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer?.mockIdRef,interviewId))
            .orderBy(UserAnswer?.id)

        console.log(result,'result')
        if(result.length>=1){

          setFeedback(result)
        } else{
          return <>
          <h2 className="font-bold text-xl">
            No ,Interview Feedback record found!
          </h2>
          </>
        }

    }
  return (
    <div className='p-10'>
        <h2 className="text-3xl font-bold text-green-500">
            Congratulation!
        </h2>
        <h2 className="font-bold text-2xl">
            Here is your interview feedback from AI
        </h2>
        <h2 className="text-purple-600 text-lg my-3">
    Your overall interview rating :
    <strong>
        {feedback.length > 0 
            ? (feedback.reduce((acc, cv) => acc + Number(cv.rating), 0) / feedback.length).toFixed(2) 
            : "N/A"
        } / 10
    </strong>
</h2>

      <h2 className="text-sm text-gray-600">
        Find below interview question with correct answer , Your answer and feedback for improvement
      </h2>
      {feedback.length>0 && feedback.map((item,index)=>(
        <Collapsible key={index} className='mt-7'>
        <CollapsibleTrigger className='w-full p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7'>{item?.question}<ChevronsUpDown className=''/> </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col gap-2">
            <h2 className="text-red-500 p-2 rounded-lg">
            Rating : <strong>{item?.rating}</strong>
            </h2>
            <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-800">
                <strong>Your Answer : {item?.userAns}</strong>
            </h2>
            <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-600">
                <strong>Correct Answer : {item?.correctAns}</strong>
            </h2>
            <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-600">
                <strong>Feedback : {item?.feedback}</strong>
            </h2>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      ))}
      
      <Button onClick={()=>router.replace('/dashboard')} className='mt-3'>Go Home</Button>
    </div>
  )
}

export default Feedback
