import React from 'react'

const api_call = () => {

   const handleClick = async (setData, setErrors, apiClass) => {
      try {
         const res = await modulesAPILink.create(creator_id)

         if (res.status < 200 || res.status >= 300) { 
            const errorData = await res.json()
            const error_message = errorData.detail
            console.log(`${error_message} Status: ${res.status}`)
            throw new Error(error_message);
         }

         const content = res.data
         setData(content.data)
         if ( development ) {
            console.log(content.detail)
         }

      } catch (err) {
         setErrors(err);
         if (development) {
            console.log(err)
         }
      }
   };

   return (
      <button onClick = {() => handleClick()} className="global-button"></button>
   )
}

// export default api_call