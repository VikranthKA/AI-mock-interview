'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../utils/db';
import { mockInterview } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import QuestionSection from '../../../_components/QuestionSection';
import RecordAnswerSection from '../../../_components/RecordAnswerSection';
import { Button } from '../../../../../components/ui/button';
import Link from 'next/link';

const StartInterview = () => {
    const { interviewId } = useParams();
    const [interviewData, setInterviewData] = useState({});
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([])
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

    useEffect(() => {
        const getInterviewDetails = async () => {
            if (!interviewId) return;
            try {
                const result = await db
                    .select()
                    .from(mockInterview)
                    .where(eq(mockInterview?.mockId, interviewId));


                if (result.length >= 1) {
                    const jsonMockResp = JSON.parse(result[0].jsonMockResp)
                    setMockInterviewQuestion(jsonMockResp)
                    setInterviewData(result[0]);

                }


                console.log(result, "result");
            } catch (error) {
                console.error("Error fetching interview details:", error);
            }
        };

        getInterviewDetails();
    }, [interviewId]);
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                {/* Questions */}
                <QuestionSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}

                />

                {/* Video Audio Recording */}
                <div>

                    <RecordAnswerSection
                        mockInterviewQuestion={mockInterviewQuestion}
                        activeQuestionIndex={activeQuestionIndex}
                        interviewData={interviewData}
                    />
                    <div className='flex justify-end mt-6 gap-7'>
                        {activeQuestionIndex > 0 && <Button  onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
                        {activeQuestionIndex!=mockInterviewQuestion?.length-1 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
                        {activeQuestionIndex === mockInterviewQuestion?.length - 1 &&
                        <Link href={`/dashboard/interview/${interviewId}/feedback`}>
                        
                            <Button  >End Interview</Button>
                        </Link>
                            }


                    </div>
                </div>

            </div>

        </div>
    )
}

export default StartInterview
