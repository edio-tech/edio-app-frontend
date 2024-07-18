import React from 'react'

const api_call = () => {

   const handleClick = async (setData, setErrors, apiClass) => {
      try {
         const res = await modulesAPILink.create(creator_id)

         if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
            if ( development ) {
              setErrors(res.data.detail)
            } else {
              setErrors('Use friendly error message')
            }
            return
         }

         const content = res.data;

         setData(content.data)
         if ( development ) {
            console.log(content.detail)
         }

      } catch (err) {
         setErrors(err.message);
         if ( development ) {
           console.log(err.message)
         }
      } finally {
         setPageRendering(false);
      }
   };

   return (
      <button onClick = {() => handleClick()} className="global-button"></button>
   )
}

// export default api_call