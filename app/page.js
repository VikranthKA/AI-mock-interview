// import { motion } from "framer-motion/dist/framer-motion";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
const steps = [
  {
    title: "1. Enter Job Details",
    description: "Provide your job role, tech stack, and years of experience.",
  },
  {
    title: "2. Answer AI-Generated Questions",
    description: "Receive five questions tailored to your role and expertise.",
  },
  {
    title: "3. Get Instant Feedback",
    description: "AI evaluates your answers, provides a rating, and suggests improvements.",
  },
];


const  HomePage=()=> {
  return (
   
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1
        className="text-4xl font-bold text-gray-800 mt-10"
        // initial={{ opacity: 0, y: -20 }}
        // animate={{ opacity: 1, y: 0 }}
      >
        AI Mock Interview
      </h1>
      <p className="text-gray-600 text-lg mt-4 text-center max-w-2xl">
        Get real-time AI-driven mock interviews based on your job role, tech stack, and experience level. Improve your skills with instant feedback and expert insights.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ delay: index * 0.2 }}
          >
            <Card className="shadow-md p-4 rounded-2xl bg-white">
              <CardContent className="text-center">
                <h2 className="text-xl font-semibold text-gray-700">{step.title}</h2>
                <p className="text-gray-500 mt-2">{step.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Link href={`/dashboard`}> <Button className="mt-10 px-6 py-3 text-lg">
        
        Start Your Mock Interview</Button>
        </Link>
    </div>
  );
}

export default HomePage

