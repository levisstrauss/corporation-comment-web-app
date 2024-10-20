import {Header} from "./Header";
import {FeedbackList} from "../feedback/FeedbackList";

export const Container = () => {
    return (
        <main className="container">
            <Header  />
            <FeedbackList />
        </main>
    )
}
