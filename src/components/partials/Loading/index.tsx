import { LoadingContainer } from "./styles";
import { FiLoader } from "react-icons/fi";

const Loading = () => {
    return (
        <>
            <LoadingContainer>
                <FiLoader size={40} className="iconLoading" />
            </LoadingContainer>
        </>
    );
};

export default Loading;
