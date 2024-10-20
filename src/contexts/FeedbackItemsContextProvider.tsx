import React, {createContext, useMemo, useState} from "react";
import {FeedbackItemProps} from "../lib/types";
import {useFeedbackItems} from "../lib/hooks";

interface FeedbackItemsContext {
    filteredFeedbackItems: FeedbackItemProps['feedbackItem'][];
    isLoading: boolean;
    errorMessage: string;
    companyList: string[];
    handleAddToList: (text: string) => void;
    handleSelectCompany: (company: string) => void;
}

interface FeedbackItemsContextProvider {
    children: React.ReactNode;
}
// The context
export const FeedbackItemsContext = createContext<FeedbackItemsContext | null>(null);


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FeedbackItemsContextProvider = ({ children }: FeedbackItemsContextProvider) => {

   const {feedbackItems, isLoading, errorMessage, setFeedbackItems } =  useFeedbackItems()

    const [selectedCompany, setSelectedCompany ] = useState("");
    // All the company names
    const companyList = useMemo(() => feedbackItems.map((item: FeedbackItemProps['feedbackItem']) =>  item.company)
            .filter((company, index, array) => {
                return array.indexOf(company) === index;
            }),
        [feedbackItems]
    );
    // Return the selected company as an array if selected otherwise, return everything
    const filteredFeedbackItems = useMemo(() => selectedCompany
        ? feedbackItems.filter(
            (feedbackItem) =>
                feedbackItem.company === selectedCompany
        ) : feedbackItems,
        [feedbackItems, selectedCompany]);
    const handleAddToList = async (text: string) => {
        const companyName = text
            .split(' ')
            .find(word => word.includes('#'))!
            .substring(1);
        // New feedbackItem data
        const newItem: FeedbackItemProps['feedbackItem'] = {
            id: new Date().getTime(),
            text: text,
            upvoteCount: 0,
            daysAgo: 0,
            company: companyName,
            badgeLetter: companyName.substring(0, 1).toUpperCase()
        };
        // Added to the feedback
        setFeedbackItems([...feedbackItems, newItem]);

        // Send it to the server after adding it
        await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
            {
                method: 'POST',
                body: JSON.stringify(newItem),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )
    };
    const handleSelectCompany = (company: string) => {
        setSelectedCompany(company);
    }

    //------------- Traditional way of fetching data --------------------//
    //  setIsLoading(true); // Set the loading state to true before fetching the data
    //  fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks')
    //  .then(res => {
    //      if (!res.ok){
    //          throw new Error();  // This will always fall back to catch
    //      }
    //      return res.json();
    //  }) //The data is in JSON format
    //  .then(data =>{
    //      // console.log(data.feedbacks)
    //      setFeedbackItems(data.feedbacks);
    //      setIsLoading(false); // Set the loading state to false after the data have been fetched
    // })
    //  .catch(() => {
    //      setErrorMessage("Something went wrong, please try again later");
    //      setIsLoading(false);
    //  });
    // }, []);

    return (
        <FeedbackItemsContext.Provider
            value={{
                isLoading,
                errorMessage,
                handleAddToList,
                filteredFeedbackItems,
                handleSelectCompany,
                companyList,
            }}
        >
            {children}
        </FeedbackItemsContext.Provider>
    )
}

