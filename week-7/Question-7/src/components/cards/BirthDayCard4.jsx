import { useNavigate, useSearchParams } from 'react-router-dom';

export default function BirthDayCard4(){

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    const age = searchParams.get("age");

    return<div>
      <div className="h-screen flex items-center justify-center">
        <div className="relative w-1/3 bg-black text-white">
          <img className="object-contain" 
          src="https://marketplace.canva.com/EAE9CPwcbvM/1/0/1131w/canva-pink-white-nature-flower-paper-border-kzBjRY3Upls.jpg" />
        </div>
        <div className="absolute top-0 left-0">
          <div className='p-5'>
            <button onClick={()=>{
              navigate("/");
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
              </svg>
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0">
          <div className="p-5 flex gap-6">
            <button onClick={()=>{
              navigate("/card3?name="+name+"&age="+age);
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path fillRule="evenodd" d="M4.72 9.47a.75.75 0 0 0 0 1.06l4.25 4.25a.75.75 0 1 0 1.06-1.06L6.31 10l3.72-3.72a.75.75 0 1 0-1.06-1.06L4.72 9.47Zm9.25-4.25L9.72 9.47a.75.75 0 0 0 0 1.06l4.25 4.25a.75.75 0 1 0 1.06-1.06L11.31 10l3.72-3.72a.75.75 0 0 0-1.06-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
            <button onClick={()=>{
              navigate("/card5?name="+name+"&age="+age);
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path fillRule="evenodd" d="M15.28 9.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L13.69 10 9.97 6.28a.75.75 0 0 1 1.06-1.06l4.25 4.25ZM6.03 5.22l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L8.69 10 4.97 6.28a.75.75 0 0 1 1.06-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div className="absolute w-1/4 text-center top-0 pt-48">
          <div className="font-cedar font-extrabold pb-16 text-[#fdba74] lg:text-5xl md:text-md sm:text-sm"> 
          Happy Birthday
          </div>
          <div className="font-dance font-bold text-[#166534] lg:text-2xl md:text-sm sm:text-xs">
            <div>Happy birthday to {name}, </div>
            <div>the cream cheese to mour bagel, </div> 
            <div>the peanut butter to our jelly,</div>
            <div>and the Merlot to our pizza night.</div>
            <div>You're the perfect match!</div>
            <div>Happy {age}th birthday!</div>
          </div>
        </div>
      </div>
    </div>
  }