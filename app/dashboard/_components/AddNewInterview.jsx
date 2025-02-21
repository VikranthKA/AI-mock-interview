"use client";
import React, { useState } from "react";
import { v4 as uuid } from 'uuid'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { chatSession } from "../../../utils/GeminiAImodel";
import { LoaderCircle } from "lucide-react";
import { db } from "../../../utils/db";
import { mockInterview } from "../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false)
  const [formState, setFormState] = useState({
    jobRole: "",
    jobDesc: "",
    yearofExp: "",
  });
  const { user } = useUser()
  const router = useRouter()

  const [JSONResp, setJSONResp] = useState([])

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    console.log("Form Data Submitted:", formState);
    const InputPrompt = `Job position:${formState.jobRole} ,Job Description:${formState.jobDesc}, Years of Experience:${formState.yearofExp}, Depends on Job Position, Description and Years of Experience give us 5 interview questions along with the answers in JSON format, Give us queston and answer field on JSON.`
    const result = await chatSession.sendMessage(InputPrompt)
    const MockJSONResp = result.response.text().replace('```json', '').replace('```', '')
    console.log(JSON.parse(MockJSONResp))
    setJSONResp(MockJSONResp)

    if (MockJSONResp) {


      const resp = await db.insert(mockInterview)
        .values({
          mockId: uuid(),
          jsonMockResp: MockJSONResp,
          jobPosition: formState.jobRole,
          jobExperience: formState.yearofExp,
          jobDesc: formState.jobDesc,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy')

        }).returning({ mockId: mockInterview.mockId })
      console.log(resp, "mid")
      if (resp[0].mockId) {
        setIsOpenDialog(false);
        setLoading(false)
        router.push(`/dashboard/interview/${resp[0].mockId}`)

      }
    } else {
      console.log('error')
    }

  };

  return (
    <div>
      {/* Clickable div to open the dialog */}
      <div
        onClick={() => setIsOpenDialog(true)}
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
      >
        <h2 className="font-bold text-lg">+ Add New</h2>
      </div>

      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
          </DialogHeader>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-muted-foreground">
              Add details about your job position/role, company, and technology stack.
            </p>

            {/* Job Role Input */}
            <div>
              <label htmlFor="job-role" className="block text-sm font-medium mb-1">
                Job Role/Job Position
              </label>
              <Input
                value={formState.jobRole}
                name="jobRole"
                onChange={handleFormChange}
                required
                id="job-role"
                placeholder="Ex. Full Stack Developer"
              />
            </div>

            {/* Job Description Input */}
            <div>
              <label htmlFor="job-description" className="block text-sm font-medium mb-1">
                Job Description/Tech Stack (In short)
              </label>
              <Textarea
                name="jobDesc"
                value={formState.jobDesc}
                onChange={handleFormChange}
                required
                id="job-description"
                placeholder="Ex. React, Java, NodeJS, Neon, Docker, ML etc"
              />
            </div>

            {/* Years of Experience Input */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium mb-1">
                Years of Experience
              </label>
              <Input
                max={100}
                value={formState.yearofExp}
                name="yearofExp"
                onChange={handleFormChange}
                required
                id="experience"
                placeholder="3"
                type="number"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-5 justify-end mt-6">
              <Button type="button" variant="ghost" onClick={() => setIsOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disable={loading.toString()}>{
                loading ? <>
                  <LoaderCircle className="animate-spin" />
                  Generating from AI
                </> : 'Start Interview'
              }</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
