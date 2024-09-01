// // import { FcGoogle } from "react-icons/fc"
// import { useSelector } from "react-redux"
// import frameImg from "../../../assets/Images/frame.png"
// import LoginForm from "./LoginForm"
// import SignupForm from "./SignupForm"

// function Template({ title, description1, description2, image, formType }) {
//   const { loading } = useSelector((state) => state.auth)

//   return (
//     <div className="grid min-h-[calc(100vh-5.5rem)] place-items-center">
//       {loading ? (
//         <div className="spinner"></div>
//       ) : (
//         <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
//           <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
//             <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
//               {title}
//             </h1>
//             <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
//               <span className="text-richblack-100">{description1}</span>{" "}
//               <span className="font-edu-sa font-bold italic text-blue-100">
//                 {description2}
//               </span>
//             </p>
//             {formType === "signup" ? <SignupForm /> : <LoginForm />}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Template


import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useNavigate } from "react-router-dom";

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  function changePageHandler(){
    if(formType === "signup"){
      navigate('/login')
    }
    else{
      navigate('/signup')
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-5.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="flex w-full h-full items-center justify-center ">
          
          <div 
            className="w-full md:w-3/4 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg flex items-center justify-center rounded"
          >
            <div className="mx-auto w-11/12 max-w-[450px] p-8">
              <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-black">
                {title}
              </h1>
              <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                <span className="text-black">{description1}</span>{" "}
                <span className=" text-sm font-bold text-pink-300 cursor-pointer"
                  onClick={changePageHandler}
                >
                  {description2}
                </span>
              </p>
              {formType === "signup" ? <SignupForm /> : <LoginForm />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Template;

