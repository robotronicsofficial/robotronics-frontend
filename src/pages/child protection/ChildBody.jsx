import React from "react";

const ChildBody = () => {
  return (
    <div>
      <div className="lg:p-20 p-8 bg-background space-y-20">
        <div className="">
          {/* Text */}
          <div className="lg:w-full px-10">
            <div className="space-y-12">
              <h1
                className="text-5xl poppins-bold text-brown"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-delay="4000"
              >
                Child Protection Policy
              </h1>
              <ol className="text-xl poppins-light space-y-2" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
                <li><strong>1. Commitment:</strong> We are committed to ensuring the safety and well-being of all children participating in our courses. Our policies are designed to protect children from harm and ensure their positive development.</li>
                
                <li><strong>2. Background Checks:</strong> All instructors undergo thorough background checks to ensure they are suitable to work with children. Periodic re-evaluations are conducted to maintain high standards of safety.</li>
                
                <li><strong>3. Code of Conduct:</strong> Instructors must adhere to a strict code of conduct that prioritizes the safety and dignity of children. Any inappropriate behavior by instructors will result in immediate disciplinary action.</li>
                
                <li><strong>4. Reporting Procedures:</strong> Any suspected abuse or misconduct must be reported immediately to the designated child protection officer. Parents, children, and staff are encouraged to report any concerns without fear of retaliation.</li>
                
                <li><strong>5. Parental Involvement:</strong> Parents are encouraged to be involved in their children's learning and to communicate any concerns they may have. Regular parent meetings and feedback sessions are conducted to ensure transparency.</li>
                
                <li><strong>6. Training:</strong> Instructors receive training on child protection policies and procedures. Ongoing professional development is provided to keep instructors updated on best practices.</li>
                
                <li><strong>7. Confidentiality:</strong> All reports and concerns are handled confidentially, with information shared on a need-to-know basis only. Records of reported incidents are securely maintained and monitored.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildBody;
