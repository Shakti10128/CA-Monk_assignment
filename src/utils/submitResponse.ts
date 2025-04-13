

const submitResponse = (selectedOptions:string[])=>{
        const storedResponses = sessionStorage.getItem("user-response");

        // Retrieve existing responses or initialize an empty array if not present
        const responses: string[][] = storedResponses ? JSON.parse(storedResponses) : [];
        
        // Current response being added (selectedOptions is an array of strings)
        const currResponse: string[] = selectedOptions;
        
        // Push the current response into the responses array
        responses.push(currResponse);
        
        // Log the responses to see the structure
        console.log(responses);
        
        // Save the updated responses array back into sessionStorage as a JSON string
        sessionStorage.setItem("user-response", JSON.stringify(responses));
}

export default submitResponse;

export const clearPreviousUserResponse = ()=>{
    // clear the previous response for the next test
    sessionStorage.setItem("user-response",JSON.stringify([]));
}