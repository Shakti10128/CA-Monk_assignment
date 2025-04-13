import { IQuestion } from "../pages/Test";



// Extending IQuestion to include user response
export interface UserResponse extends IQuestion {
    userSelectedOptions: string[];
}

// Final score will be an array of responses
export const finalScore: UserResponse[] = [];