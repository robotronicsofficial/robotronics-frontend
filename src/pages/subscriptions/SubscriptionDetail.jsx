import { Circle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const resources = [
  "Recorded Video Lectures",
  "Code Files for each Lecture(Where ever applicable)",
  "Practice Assignments",
  "Module based Assessments",
  "E-Certificates for Active Learners",
];

const SubscriptionDetail = () => (
  <div className="bg-background py-5 lg:px-24">
    <Card className="rounded-xl bg-card p-0" data-aos="fade-up">
      <CardContent className="p-8 py-6">
        <div className="py-5">
          <h1 className="mb-4 text-xl font-bold poppins-bold">Who this course is for?</h1>
          <p className="text-wrap text-foreground poppins-light">
            The subscription is for parents who want to prepare their kids for the future by exposing them to modern skills.
            <br />
            This is for students of age 6 and onwards belonging to any socio-economic background can benefit from this program across the Globe. All the courses are recorded in simple English language with generally acceptable accent.
          </p>
        </div>

        <div className="flex flex-col gap-y-4">
          <div className="mb-2">
            <p className="text-2xl font-medium poppins-bold">Requirements</p>
          </div>
          <p className="text-wrap text-foreground poppins-light">
            Students only need a normal internet connection. The learning platform is responsive across laptop, tablet, and mobile screens.
          </p>

          <p className="text-2xl font-medium poppins-bold">Resources Provided by Robotronics</p>

          <ul className="flex flex-col gap-y-3 poppins-light">
            {resources.map((resource) => (
              <li key={resource} className="flex items-center gap-x-9">
                <Circle className="text-primary" />
                <span>{resource}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default SubscriptionDetail;
