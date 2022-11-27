import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../PrimaryButton';

function ErrorPage(props) {

    const navigate = useNavigate();

    return (
        <>
            <div class="d-flex align-items-center justify-content-center vh-100">
                <div class="text-center">
                    <h1 class="display-1 fw-bold">{props.errorCode}</h1>
                    <p class="fs-3"> <span class="text-danger">Oops!</span> {props.message}</p>
                    <PrimaryButton label="Go Home" variant="primary" onClick={() => {navigate("/");}} />
                </div>
            </div>
        </>
    );
};

export default ErrorPage;