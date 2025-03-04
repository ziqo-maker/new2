import React, { useState } from 'react';
import Image, {StaticImageData} from "next/image"
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import test from '@/imgs/test.png';
import Marquee from 'react-fast-marquee'

function App() {
  const slides = [
    {
      url: 'https://fastly.picsum.photos/id/907/200/300.jpg?hmac=BYvJHklGn1KzEhHiZTkbQtFiRXUET5zYdLLKS6RXF3I',
      nmb: 0
    },
    {
      url: 'https://fastly.picsum.photos/id/633/200/200.jpg?hmac=3ZyIOtFWRly1tYi_sTXjhSKzDlB-94qs6KCeIdeiCJo',
      nmb:1
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex:number) => {
    setCurrentIndex(slideIndex);
  };
  

  return (

    <div className=" flex-1 overflow-hidden max-w-xl mx-auto  h-screen bg-white">
      
    <div className="flex flex-col justify-between bg-black w-full h-full m-auto  relative group bg-white">

    <div className='flex justify-between items-center mr-3 ml-3 mt-4 '>
    <div className={`${currentIndex == 0 ? 'invisible' : ''}  text-2xl text-white`}>
    <IoIosArrowDropleftCircle onClick={prevSlide} size={40} color='#ffb835' />
    </div>
      <div className='flex'>
      {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          > 
            
            <GoDotFill size={20} color={`${slideIndex == currentIndex ? '#ffb835' : ''}`} />

          </div>
          
        ))}
      </div>
      
      <div className={`${currentIndex == 0 ? '' : 'invisible'}  text-2xl text-white`}>
      <IoIosArrowDroprightCircle onClick={nextSlide} size={40} color='#ffb835' />
      </div>

      </div>
      
      <div className="flex flex-col text-center font-bold text-wrap">
              <p className="mr-3 ml-3 mt-1 text-[#ffae19]/[0.9] font-Large text-xl glow">Unlocking Characters!</p>
              <p className="mr-3 ml-3 mt-1 text-[#ffae19]/[0.9] font-normal  text-lg">By unlocking characters, you can increase the price of your WalkCoin tokens and walk with your favorite character.</p>
              </div>
               
               <div className='flex flex-col grow justify-center items-center'>
               <section className="flex  justify-center items-center w-full">
          <div className="items-center w-full justify ">
            <Marquee gradientWidth={120} gradient={true} className=" items-center py-2 overflow-hidden ">
            <Image 
                       src={test as StaticImageData}
                        
                     className="w-full h-full  aspect-square rounded-xl object-cover"
                     alt=""
                   />
          
            </Marquee>
          </div>
        </section>
                        
                                 
                       </div>

          
      
      <div className='flex w-full justify-center items-center'>
      <button onClick={() => {}}>
    <div className="flex items-center w-80 rounded-full px-4 py-[12px] border-white border-4 border-double bg-[#ffae19]/[0.9] items-center justify-center">
    <p className={`font-bold text-lg text-white glow text-nowrap`}>Next</p>
    </div>
     </button>  
      </div>
     
     <div className='h-4 '/>
      
    </div>
    </div>
   
  );
}

export default App;
