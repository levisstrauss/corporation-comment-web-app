import {FeedbackItem} from "./FeedbackItem";
import {Spinner} from "../Spinner";
import {ErrorMessage} from "../ErrorMessage";
import {useFeedbackItemsStore} from "../../stores/feedbackItemsStore";




export const FeedbackList = () => {
    // const {isLoading, errorMessage, filteredFeedbackItems } = useFeedbackItemsContext(); // context

    const isLoading = useFeedbackItemsStore(state => state.isLoading);
    const errorMessage = useFeedbackItemsStore(state => state.errorMessage);
    const filteredFeedbackItems  = useFeedbackItemsStore(state => state.getFilteredFeedbackItems());


    return (
        <ol className="feedback-list">
            {isLoading ? (<Spinner />) : null}
            {errorMessage ? <ErrorMessage message={errorMessage}/> : null }

            {filteredFeedbackItems.map((feedbackItem) => (
                <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
            ))}
        </ol>
    );
}
