import React from 'react'
import '../app/card.module.css'

type props={
    currentTemp:number;
    maxTemp:number;
     minTemp:number;
     description:string | undefined;
     city:string | undefined;
     isLoading:boolean

}


const Card = ({currentTemp,maxTemp,minTemp,description,city,isLoading}:props) => {
  // console.log(currentTemp,maxTemp,minTemp)
  return (
    <>
   
    
    <main>
        {isLoading ? <section className="sky">
            <div className="cloud-1"></div>
            <div className="cloud-2" style={{position:"relative"}}>
              <div className='animate-pulse h-2 w-64 absolute top-6 left-10 bg-gray-400'>
              
              </div>
            </div>
            <div className="cloud-3"></div>
            <div className="sun"></div>
        </section> :
        
        <section className="sky">
            <div className="cloud-1"></div>
            <div className="cloud-2" style={{position:"relative"}}>
              <div style={{position:"absolute",top:15,left:15}}>
               {city}
              </div>
            </div>
            <div className="cloud-3"></div>
            <div className="sun"></div>
        </section>
        
        
        
        }
      {isLoading ?  <section className="content p-8">
            <h1>&deg;C</h1>
             <div className='flex items-center justify-center flex-col gap-5'>
              <div className='animate-pulse h-2 w-64 bg-gray-500'>

              </div>
              <div className='animate-pulse h-2 w-64 bg-gray-500'>

              </div>
              <div className='animate-pulse h-2 w-64 bg-gray-500'>

              </div>


             </div>
        </section>:
        
        <section className="content">
        <h1>{currentTemp}&deg;C</h1>
        <h3 className='capitalize'>{description}</h3>

        <div className="details">
            <div>
                <p className="value">{minTemp}&deg;</p>
                <p className="label">Minimum</p>
            </div>
            <div>
                <p className="value">{maxTemp}&deg;</p>
                <p className="label">Maximum</p>
            </div>
            <div>
                <p className="value">19%</p>
                <p className="label">Precipitation</p>
            </div>
            <div>
                <p className="value">22%</p>
                <p className="label">Humidity</p>
            </div>
        </div>
    </section>
        
        
        
        
        }
    </main>
    
    </>
  )
}

export default Card