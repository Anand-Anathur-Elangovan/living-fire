// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

import { ToastContainer } from "react-toastify";

export default function Home() {
  // const router = useRouter();
  // useEffect(()=>{
  //   router.push('/home')
  // },[])

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <ToastContainer />
      Welcome to the next js application
    </div>
  );
}
