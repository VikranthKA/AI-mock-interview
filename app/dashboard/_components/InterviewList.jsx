'use client';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { db } from '../../../utils/db';
import { mockInterview } from '../../../utils/schema';
import { desc, eq } from 'drizzle-orm';
import InterviewItemCard from './InterviewItemCard';

const InterviewList = () => {
  const { user, isLoaded } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (isLoaded && user) { 
      console.log('effect', user);
      getInterviewList();
    }
  }, [isLoaded, user]); 

  const getInterviewList = async () => {
    if (!user) return; 

    console.log(user.primaryEmailAddress?.emailAddress, "email");

    const result = await db.select()
      .from(mockInterview)
      .where(eq(mockInterview?.createdBy, user.primaryEmailAddress?.emailAddress))
      .orderBy(desc(mockInterview?.id));

    console.log(result, 'result');

    if (result.length >= 1) setInterviewList(result);
  };

  return (
    <div>
      {interviewList.length >= 1 && (
        <h2 className="font-medium text-lg">Previous Mock Interview</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList.length >= 1 &&
          interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
      </div>
    </div>
  );
};

export default InterviewList;
