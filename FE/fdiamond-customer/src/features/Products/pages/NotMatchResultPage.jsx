import { useNavigate } from "react-router-dom";

const NotMatchResultPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>Sorry, we couldn't find any results that match your search criteria.
                Please try broadening your search or resetting your filters</h1>
            <button
                className="p-10 bg-slate-400"
                onClick={() => navigate(-1)}>
                Go Back
            </button>
        </>
    )
};

export default NotMatchResultPage;
