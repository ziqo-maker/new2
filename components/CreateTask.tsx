'use client'
 
import Etc from '@/icons/etc.svg';
import FootPrint from '@/icons/footprint.svg';
import Image, {StaticImageData} from "next/image";
import React,{ useState } from 'react'
import { NewUserContext } from '@/contexts/UserContextB';
import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Info from '@/icons/info.svg';
import Toast from 'typescript-toastify';
import { useTab } from '@/contexts/TabContext'


const CreateTask = () => {
     

  const { UserDt,setUserData } = React.useContext(NewUserContext);
 
    const [describe, setDescribe] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('');
    const [keyworddescribe, setDescribeKeyword] = useState<string>('');

    const [contact, setContact] = useState<string>(String(UserDt?.username));
    const [project, setProject] = useState<string>('');
    const [click, setClick] = useState<string>('');
    const [platform, setPlatform] = useState<string>('Select platform');
   
   const { activeTab, setActiveTab } = useTab()

    const handle = async(describe:string,link:string,keyword:string,contact:string,project:string,clicks:number,platform:string,keyworddescribe:string) => {

      const calclicks = clicks*100000
      const nmbpoint = Number(UserDt?.gtpoint)
  
      if(link.length == 0 || describe.length == 0 || contact.length ==0 || project.length ==0|| clicks==0 || platform.length ==0){
        new Toast({
          position: "top-center",
          toastMsg: "You must fill in all of the fields.",
          autoCloseTime: 4500,
          canClose: true,
          showProgress: true,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          type: "default",
          theme: "light"
        });
      }else if(clicks < 200) {
        new Toast({
          position: "top-center",
          toastMsg: "Minimum clicks: 200",
          autoCloseTime: 4500,
          canClose: true,
          showProgress: true,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          type: "default",
          theme: "light"
        });
      } else {
        const decreasepoint = nmbpoint - calclicks
        if(nmbpoint >=  calclicks){
          
          try {
            fetch('/api/create-task', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({describe:String(describe),url:String(link),keyword:String(keyword),contact:String(contact),project:String(project),clicks:Number(clicks),platform:String(platform),points:Number(decreasepoint),idd:String(UserDt?.idd),keyworddescribe:String(keyworddescribe) }),
           })
           .then((res) => res.json())
           .then((data) => {
            if(data.success){
              setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(decreasepoint),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username),ticket:String(UserDt?.ticket),firstname:String(UserDt?.firstname)})
              new Toast({
                position: "top-center",
                toastMsg: "Done.",
                autoCloseTime: 5500,
                canClose: true,
                showProgress: true,
                pauseOnHover: true,
                pauseOnFocusLoss: true,
                type: "default",
                theme: "light"
              });
              setActiveTab('tasks')
              setDescribe('')
              setLink('')
              setKeyword('')
              setPlatform('Select platform')
              setContact('')
              setProject('')
              setClick('')
              setDescribeKeyword('')
            }
           })
         } catch (err) {
          
         }

        }else{
          new Toast({
                        position: "top-center",
                        toastMsg: "Not enough balance",
                        autoCloseTime: 4500,
                        canClose: true,
                        showProgress: true,
                        pauseOnHover: true,
                        pauseOnFocusLoss: true,
                        type: "default",
                        theme: "light"
                      });
        }

      }


      }

       
    return (
        <div className="flex justify-center overflow-auto">
         <div className="w-full h-screen bg-white flex-col ">
         <div className="flex-1 mt-5 text-center font-bold text-wrap">
              <p className="mr-3 ml-3 text-[#ffae19]/[0.9] font-Large text-xl glow">Reach Your Goals & Achieve Success FASTER</p>
              <p className="mr-1 ml-1 text-[#ffae19]/[0.9] font-normal  text-lg">The effective way to promote your social media, app, etc.</p>
              </div>
              <div className="flex flex-col justify-center items-center mt-6">
              <p className="text-black w-[calc(100%-2rem)] font-Large text-base">Demo preview:</p>
              
              <div className="w-[calc(100%-2rem)] flex-1 mt-1 px-3  items-center bg-[#ffae19]/[0.9] border-white border-4 border-double rounded-full py-[5px] ">
                             <div className="grow flex items-center">
                             <Image
        src={Etc}
      className="w-11 h-11  aspect-square object-cover  "
      alt="Shiba Inu"
    />
                           
              <div className="px-2"/>
              <div className="grow space-y-1">
              <p className="text-white font-Large text-lg text-wrap text-left">Describe your task</p>
              <div className="grow flex items-center space-x-1">
                            <Image
        src={FootPrint as StaticImageData}
      className="w-7 h-7 "
      alt=""
    />     
              <p className="text-white font-normal  text-base">+{(35000).toLocaleString()}</p> 
                            </div>
              </div>
              <div className="px-1"/>
              <div className="flex items-center">
             
              <div className=" px-1"/>
              <div  className={`bg-black flex w-16 h-8 text-center items-center justify-center rounded-full px-3 py-[3px]`}>
              <p className={`text-white  font-Large `}>Start</p>
              

              </div> 
              
              </div>

                             </div>                          
                            
                
                            </div>

              </div>
              <center>
              <p className={`mr-4 ml-4 flex justify-center grow text-[#db0000]/[0.9] font-bold font-Large text-xl glow mt-5`}>All fields are required</p>
             
        <div className="relative w-[calc(100%-4rem)] mt-4">
    <input type="text" id="floating_filled" value={describe} onChange={(e) => setDescribe(e.target.value)}  maxLength={40} className="block rounded-xl px-2.5 pb-2.5 pt-5 w-full text-base text-white bg-[#6b4d11]/[0.8] dark:bg-[#6b4d11]/[0.8] border-0 border-b-4 border-[#ffae19]/[0.9] appearance-none dark:text-white dark:border-[#ffae19]/[0.9] dark:focus:border-[#ffae19]/[0.9] focus:outline-none focus:ring-0 focus:border-[#ffae19]/[0.9] peer" placeholder=" " />
    <label form="floating_filled" className="absolute text-sm  text-white dark:text-white/[0.9] italic font-bold  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Describe your task</label>
    </div>
    <div className='flex w-[calc(100%-4rem)] justify-end items-end'>
    <p className={`font-normal text-base glow mt-1 text-black`}>{describe.length}/40</p>
    </div>

    <div className="relative w-[calc(100%-4rem)] mt-4">
    <input type="text" id="floating_filled" value={link} onChange={(e) => setLink(e.target.value)} className="block rounded-xl px-2.5 pb-2.5 pt-5 w-full text-base text-white bg-[#6b4d11]/[0.8] dark:bg-[#6b4d11]/[0.8] border-0 border-b-4 border-[#ffae19]/[0.9] appearance-none dark:text-white dark:border-[#ffae19]/[0.9] dark:focus:border-[#ffae19]/[0.9] focus:outline-none focus:ring-0 focus:border-[#ffae19]/[0.9] peer" placeholder=" " />
    <label form="floating_filled" className="absolute text-sm  text-white dark:text-white/[0.9] italic font-bold  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter the link</label>
    </div>

    <Menu as="div" className="relative  w-[calc(100%-4rem)] mt-4">
        <MenuButton className="inline-flex block justify-between rounded-xl px-2.5 pb-2.5 pt-5 w-full text-base text-white bg-[#6b4d11]/[0.8] dark:bg-[#6b4d11]/[0.8] border-0 border-b-4 border-[#ffae19]/[0.9] appearance-none dark:text-white dark:border-[#ffae19]/[0.9] dark:focus:border-[#ffae19]/[0.9] focus:outline-none focus:ring-0 focus:border-[#ffae19]/[0.9] peer">
        <p className={`font-normal text-base ${platform == 'Select platform' ? 'text-white/[0.9] italic font-bold' : 'text-white font-normal'}`}>{platform}</p>
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-7 text-white" />
        </MenuButton>
        <label form="floating_filled" className="absolute text-sm  text-white dark:text-white/[0.9] italic font-bold  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Platform</label>


      <MenuItems 
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#ffae19] ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div >
          <button  onClick={() => setPlatform('Telegram')} className='flex px-4 py-4   grow w-full text-center items-center justify-center'>
            <a
              className="block text-sm font-bold text-black "
            >
              Telegram
            </a>
          </button>
          <div className='flex grow w-full border-0 border-b-4 border-white'/>
          <button  onClick={() => setPlatform('Youtube')} className='flex px-4 py-4   grow w-full text-center items-center justify-center'>
            <a
              className="block text-sm font-bold text-black "
            >
              Youtube
            </a>
          </button>
          <div className='flex grow w-full border-0 border-b-4 border-white'/>
          <button  onClick={() => setPlatform('Instagram')} className='flex px-4 py-4   grow w-full text-center items-center justify-center'>
            <a
              className="block text-sm font-bold text-black "
            >
             Instagram
            </a>
          </button>
          <div className='flex grow w-full border-0 border-b-4 border-white'/>
          <button  onClick={() => setPlatform('Google Play Store')} className='flex px-4 py-4   grow w-full text-center items-center justify-center'>
            <a
              className="block text-sm font-bold text-black "
            >
              Google Play Store
            </a>
          </button>
          <div className='flex grow w-full border-0 border-b-4 border-white'/>
          <button  onClick={() => setPlatform('Apple App Store')} className='flex px-4 py-4   grow w-full text-center items-center justify-center'>
            <a
              className="block text-sm font-bold text-black "
            >
              Apple App Store
            </a>
          </button>
          <div className='flex grow w-full border-0 border-b-4 border-white'/>
          <button  onClick={() => setPlatform('Etc')} className='flex px-4 py-4  grow w-full text-center items-center justify-center'>
            <a
              className="block text-sm font-bold text-black "
            >
              Etc
            </a>
          </button>

        </div>
      </MenuItems>
    </Menu>

  

    <div className="relative w-[calc(100%-4rem)] mt-5">
    <input type="text" id="floating_filled" value={keyword}  onChange={(e) => setKeyword(e.target.value)} maxLength={4} className="block rounded-xl px-2.5 pb-2.5 pt-5 w-full text-base text-white bg-[#6b4d11]/[0.8] dark:bg-[#6b4d11]/[0.8] border-0 border-b-4 border-[#ffae19]/[0.9] appearance-none dark:text-white dark:border-[#ffae19]/[0.9] dark:focus:border-[#ffae19]/[0.9] focus:outline-none focus:ring-0 focus:border-[#ffae19]/[0.9] peer" placeholder=" " />
    <label form="floating_filled" className="absolute text-sm  text-white dark:text-white/[0.9] italic font-bold  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Keyword (Optional)</label>
    </div>
    <div className='flex w-[calc(100%-4rem)] mt-1 justify-between items-between space-x-1'>
    <p className={`font-normal text-base glow  text-black text-wrap`}>By using the keyword, You can be sure that you are targeting the right audience</p>
    <p className={`font-normal text-base glow text-black`}>{keyword.length}/4</p>

    </div>
    <div className='flex w-[calc(100%-4rem)] justify-start items-center'>
    <p className={`font-normal text-base glow text-black`}>Note: The keyword must be clearly visible to users and should begin with the prefix KW-{keyword}. Failure to comply will result in the publication of your task without the keyword. </p>

    </div>
    <div className="relative w-[calc(100%-4rem)] mt-5">
    <input type="text" id="floating_filled" value={keyworddescribe} onChange={(e) => setDescribeKeyword(e.target.value)} disabled={keyword.length == 0? true : false} maxLength={40} className="disabled:opacity-75 block rounded-xl px-2.5 pb-2.5 pt-5 w-full text-base text-white bg-[#6b4d11]/[0.8] dark:bg-[#6b4d11]/[0.8] border-0 border-b-4 border-[#ffae19]/[0.9] appearance-none dark:text-white dark:border-[#ffae19]/[0.9] dark:focus:border-[#ffae19]/[0.9] focus:outline-none focus:ring-0 focus:border-[#ffae19]/[0.9] peer" placeholder="" />
    <label form="floating_filled" className="absolute text-sm  text-white dark:text-white/[0.9] italic font-bold  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Describe your keyword</label>
    </div>
    <div className='flex w-[calc(100%-4rem)] justify-start items-start'>
    <p className={`font-normal text-base glow mt-1 text-black`}>E.g. Find the keyword in the video</p>
    </div>
    <div className="relative w-[calc(100%-4rem)] mt-5">
    <input type="text" id="floating_filled" value={contact} onChange={(e) => setContact(e.target.value)} maxLength={250} className="block rounded-xl px-2.5 pb-2.5 pt-5 w-full text-base text-white bg-[#6b4d11]/[0.8] dark:bg-[#6b4d11]/[0.8] border-0 border-b-4 border-[#ffae19]/[0.9] appearance-none dark:text-white dark:border-[#ffae19]/[0.9] dark:focus:border-[#ffae19]/[0.9] focus:outline-none focus:ring-0 focus:border-[#ffae19]/[0.9] peer" placeholder="" />
    <label form="floating_filled" className="absolute text-sm  text-white dark:text-white/[0.9] italic font-bold  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Contact</label>
    </div>
    <div className='flex w-[calc(100%-4rem)] justify-start items-start'>
    <p className={`font-normal text-base glow mt-1 text-black`}>So we can contact you</p>
    </div>

    <div className="relative w-[calc(100%-4rem)] mt-5">
    <input type="text" id="floating_filled" value={project} onChange={(e) => setProject(e.target.value)} className="block rounded-xl px-2.5 pb-2.5 pt-5 w-full text-base text-white bg-[#6b4d11]/[0.8] dark:bg-[#6b4d11]/[0.8] border-0 border-b-4 border-[#ffae19]/[0.9] appearance-none dark:text-white dark:border-[#ffae19]/[0.9] dark:focus:border-[#ffae19]/[0.9] focus:outline-none focus:ring-0 focus:border-[#ffae19]/[0.9] peer" placeholder="" />
    <label form="floating_filled" className="absolute text-sm  text-white dark:text-white/[0.9] italic font-bold  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Describe your project</label>
    </div>
    <div className='flex w-[calc(100%-4rem)] mt-1 justify-between items-between'>
    <p className={`font-normal text-base glow text-black text-wrap`}>Tell us about your project and what you'd like to promote</p>    
    </div>
    
    <div className="relative w-[calc(100%-4rem)] mt-5">
    <input type="number" id="floating_filled" value={click} onChange={(e) => setClick(e.target.value)} className="block rounded-xl px-2.5 pb-2.5 pt-5 w-full text-base text-white bg-[#6b4d11]/[0.8] dark:bg-[#6b4d11]/[0.8] border-0 border-b-4 border-[#ffae19]/[0.9] appearance-none dark:text-white dark:border-[#ffae19]/[0.9] dark:focus:border-[#ffae19]/[0.9] focus:outline-none focus:ring-0 focus:border-[#ffae19]/[0.9] peer" placeholder="" />
    <label form="floating_filled" className="absolute text-sm  text-white dark:text-white/[0.9] italic font-bold  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Number of clicks</label>
    </div>
    <div className='flex w-[calc(100%-4rem)] mt-1 justify-start items-start '>
    <p className={`font-normal text-base glow text-black text-wrap`}>Minimum clicks: 200</p>    
    </div>
    <div className='flex w-[calc(100%-4rem)] mt-1 justify-center items-center'>
    <p className={`font-normal text-base glow text-black text-wrap`}>Select the number of impressions or clicks you need, pay with WalkCoin</p>    
    </div>
    <div className="relative w-[calc(100%-4rem)] mt-5">
    <div className="flex justify-between items-center space-x-2 px-4 pb-4 pt-4 w-full text-base text-white   rounded-full border-[#6b4d11]/[0.9] appearance-none dark:text-white border-4 dark:focus:border-[#ffae19]/[0.9] focus:outline-none focus:ring-0 focus:border-[#ffae19]/[0.9] peer">
    <p className={`font-normal text-base text-black text-nowrap`}>Price per click</p>
    <div className='flex items-center'>
    <Image 
        src={FootPrint as StaticImageData} 
      className="w-8 h-8 aspect-square object-cover"
      alt=""
    />
    <p className={`font-normal text-base text-black text-wrap`}>{(Number(click)*100000).toLocaleString()}</p>        
    </div>
    
    </div>
     </div>

     <div className="relative w-[calc(100%-4rem)] mt-5">
    <div className="flex justify-between items-center space-x-2 px-4 pb-4 pt-4 w-full text-base text-white   rounded-full border-[#6b4d11]/[0.9] appearance-none dark:text-white border-4 dark:focus:border-[#ffae19]/[0.9] focus:outline-none focus:ring-0 focus:border-[#ffae19]/[0.9] peer">
    <p className={`font-normal text-base text-black text-nowrap`}>Price</p>
    <div className='flex items-center'>
    <Image 
        src={FootPrint as StaticImageData} 
      className="w-8 h-8 aspect-square object-cover"
      alt="Shiba Inu"
    />
    <p className={`font-normal text-base text-black text-wrap`}>{(100000).toLocaleString()}</p>        
    </div>
    </div>
    

    <div className="flex flex-col text-wrap bg-[#6b4d11]/[0.3] py-2 rounded-xl mt-5">

<div className='flex flex-col  justify-start items-start  mr-4 ml-4'>
      <p className={`font-bold text-base  text-black text-wrap`}>Details</p> 
      <div className='flex grow w-full  border-0 mt-1 border-b-2 border-white'/>

      </div>
      
      <div className='flex justify-between items-center mt-3 text-wrap mr-4 ml-4'>
      <p className={`flex font-normal text-base text-black`}>Link</p>        
      <p className={`flex font-normal text-base text-black text-wrap`}>{link}</p>        
      </div>

      <div className='flex justify-between items-center mt-3 text-wrap mr-4 ml-4'>
      <p className={`flex font-normal text-base text-black`}>Platform</p>        
      <p className={`flex font-normal text-base text-black text-wrap`}>{platform == 'Select platform' ? '' : platform}</p>        
      </div>

      <div className='flex justify-between items-center mt-3 text-wrap mr-4 ml-4'>
      <p className={`flex font-normal text-base text-black`}>Number of clicks</p>        
      <p className={`flex font-normal text-base text-black text-wrap`}>{click}</p>        
      </div>

      <div className='flex justify-between items-center mt-3 text-wrap mr-4 ml-4'>
      <p className={`flex font-normal text-base text-black`}>Price</p>  
      <div className='flex items-center space-x-1'>
      <Image 
        src={FootPrint as StaticImageData} 
      className="w-7 h-7 aspect-square object-cover"
      alt=""
    />
     <p className={`flex font-normal text-base text-black text-wrap`}>{(Number(click)*100000).toLocaleString()}</p>        

        </div>      
      </div>

     </div>
      <div className='h-10 ' />

     <button onClick={() => handle(describe,link,keyword,contact,project,Number(click),platform,keyworddescribe)} data-dialog-target="dialog" className="relative w-[calc(100%-6rem)]">
    <div className="flex justify-center items-center space-x-2 px-4 pb-2 pt-2 w-full text-base text-white border-[#ffae19]/[0.9]  rounded-full bg-[#6b4d11]/[0.9] appearance-none dark:text-white border-4  focus:outline-none focus:ring-0 peer">
    <p className={`font-bold text-lg text-white glow text-nowrap`}>Publish</p>
    </div>
     </button>  

     <div className='flex space-x-1 text-start mr-1 ml-1 mt-1 justify-center items-center'>
     <Image 
        src={Info as StaticImageData} 
      className="w-7 h-7 aspect-square object-cover"
      alt=""
    />
    <p className={`font-normal text-start text-base glow text-black text-wrap`}>After reviewing the task, we will publish it</p>    
    </div>
     </div>


              </center>
              <div className='h-1/5'/>
         </div>
        </div>
    )
}

export default CreateTask
