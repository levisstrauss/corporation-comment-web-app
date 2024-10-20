import {useEffect} from "react";
import {Footer} from "./components/layout/Footer";
import {Container} from "./components/layout/Container";
import {HashtagList} from "./components/hashtag/HashtagList";
import {useFeedbackItemsStore} from "./stores/feedbackItemsStore";

export const App = () => {
    const fetchFeedbackItems = useFeedbackItemsStore(
        (state) => state.fetchFeedbackItems
    );
    useEffect(() => {
        fetchFeedbackItems();
    }, [fetchFeedbackItems]);


  return (
      <div className="app">
        <Footer />
        {/*<FeedbackItemsContextProvider>*/}
        <Container />
        <HashtagList />
        {/*</FeedbackItemsContextProvider>*/}
      </div>
  )
}

export default App
