import { useNavigate } from 'react-router-dom'
import Button from 'src/Components/Button/Button'

export default function NotFoundPage() {

    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className='page-container min-h-screen flex flex-col justify-center items-center'>
            <h1 className="text-h1 font-bold mb-36">
                404 Not Found...
            </h1>
            <p className="text-body4 text-gray-500 font-medium mb-16">
                The resource you are looking for isn't here anymore, it may have been removed or the url may be invalid.
            </p>
            <Button color='primary' onClick={goBack}>
                Go back
            </Button>
        </div>
    )
}
