import {Pattern} from "../Pattern";
import {Logo} from "../Logo";
import {PageHeading} from "../PageHeading";
import {FeedbackForm} from "../feedback/FeedbackForm";
import {useFeedbackItemsStore} from "../../stores/feedbackItemsStore.ts";


export const Header = () => {
    // const {handleAddToList} = useFeedbackItemsContext() // from the context

    const addItemToList = useFeedbackItemsStore(state => state.addItemToList); // Zustand

    return (
        <header>
            <Pattern />
            <Logo />
            <PageHeading />
            <FeedbackForm onAddToList={ addItemToList } />
        </header>
    )
}
