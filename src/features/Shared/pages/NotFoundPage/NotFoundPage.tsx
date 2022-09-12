import { useNavigate } from 'react-router-dom'
import Button from 'src/Components/Button/Button'

export default function NotFoundPage() {

    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className="page-container">
            <div className='min-h-screen flex flex-col gap-36 justify-center items-center relative'>
                <p className='text-gray-100 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[50vmin] z-[-1]'>404</p>
                <h1 className="text-h1 font-bold">
                    Not Found...
                </h1>
                <p className="text-body4 text-gray-500 font-medium text-center">
                    The resource you are looking for isn't here anymore, it may have been removed or the url may be invalid.
                </p>
                <Button color='primary' onClick={goBack}>
                    Go back
                </Button>
            </div>
        </div>
    )
}
