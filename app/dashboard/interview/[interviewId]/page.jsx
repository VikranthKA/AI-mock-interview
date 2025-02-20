"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { mockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";

const Interview = () => {
    const { interviewId } = useParams();
    const [interviewData, setInterviewData] = useState({});
    const [isWebcamEnabled, setIsWebCamEnabled] = useState(false);

    useEffect(() => {
        const getInterviewDetails = async () => {
            if (!interviewId) return;
            try {
                const result = await db
                    .select()
                    .from(mockInterview)
                    .where(eq(mockInterview?.mockId, interviewId));


                if (result.length >= 1) {
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
        <div className="my-10 ">
            <h2 className="font-bold text-2xl text-center">Let's get started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col items-start ">
                    <div className="job flex flex-col gap-5 my-2 p-5">
                        <h2 className="text-lg">
                            <strong className="">Job Role/Job Position : </strong>
                            {interviewData?.jobPosition}
                        </h2>
                        <h2 className="text-lg capitalize">
                            <strong className="">Job Description : </strong>
                            {interviewData?.jobDesc}
                        </h2>
                        <h2 className="text-lg">
                            <strong className="">Job Experience : </strong>
                            {interviewData?.jobExperience}
                        </h2>
                    </div>

                    <div className="alert p-5 border rounded-lg border-yellow-300 bg-yellow-300">
                        <h2 className="flex mb-2 animate-pulse text-yellow-600">

                            <Lightbulb className=" font-extrabold" />
                            <strong className="">Information</strong>
                        </h2>
                        <h2>
                            Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview,It has 5 questions which you can answer and at the last you will get report on the basis of your answer.
<br/>
                            <span className="text-base text-red-400">

                                NOTE: We never recored your video ,Web cam access you can disable at any time if you want
                            </span>

                        </h2>
                    </div>
                </div>

                <div>
                    {isWebcamEnabled ? (
                        <Webcam
                            onUserMedia={() => setIsWebCamEnabled(true)}
                            onUserMediaError={() => setIsWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 450,
                                width: 450,
                            }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className="h-72 w-full p-20 my-7 bg-secondary rounded-lg border" />
                            <Button className="w-full" onClick={() => setIsWebCamEnabled(true)}>
                                Enable Web Cam & Microphone
                            </Button>

                        </>
                    )}
                </div>


            </div>
            <div className="flex justify-end items-end">
                <Link href={`/dashboard/interview/${interviewId}/start`}>
                
            <Button   className={`mt-5 bg-blue-500`}>Start Interview</Button>
                </Link>

            </div>
        </div>
    );
};

export default Interview;
