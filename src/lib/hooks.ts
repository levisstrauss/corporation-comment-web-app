import {useContext, useEffect, useState} from "react";
import {FeedbackItemsContext} from "../contexts/FeedbackItemsContextProvider";
import {FeedbackItemProps} from "./types.ts";

export function useFeedbackItemsContext() {
    const context = useContext(FeedbackItemsContext);
    if(!context) {
        throw new Error("FeedbackItemsContext is not defined in the FeedbackList component");
    }
    return context;
}


export const useFeedbackItems = () => {
    const [feedbackItems, setFeedbackItems] = useState<FeedbackItemProps['feedbackItem'][]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    // Fetching the dat from the server
    useEffect(() => {
        //------------- Modern way of fetching data --------------------//
        const fetchFeedbackItems = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks');
                // If error exists throw it
                if (!response.ok) {
                    throw new Error();
                }
                // Otherwise, convert it to JSON format
                const data = await response.json();
                setFeedbackItems(data.feedbacks);
            } catch (error) {
                setErrorMessage("Something went wrong! Please try again later!");
            }
            setIsLoading(false);
        };
        fetchFeedbackItems();
    }, []);

    return {
        feedbackItems,
        isLoading,
        errorMessage,
        setFeedbackItems,
    }
}
