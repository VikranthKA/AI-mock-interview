import React from 'react'
import { Button } from '../../../components/ui/button'
import Link from 'next/link'

const InterviewItemCard = ({interview}) => {
    console.log(interview)
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>Postion : {interview?.jobPosition
}</h2>
        <h2 className='text-sm text-gray-600'>Experience : {interview?.jobExperience}</h2>
        <h2 className='text-xs text-gray-500'>Created At : {interview?.createdAt
        }</h2>
        <div className='flex justify-between mt-2 gap-5'>
<Link  className='w-full' href={`/dashboard/interview/${interview?.mockId}/feedback`}>
<Button size='sm' variant='outline' className='w-full' >Feedback</Button>
 
 </Link>
 <Link  className='w-full' href={`/dashboard/interview/${interview?.mockId}/start`}>

<Button size='sm' className='w-full'>Start</Button>
</Link>
        </div>


      
    </div>
  )
}

export default InterviewItemCard
