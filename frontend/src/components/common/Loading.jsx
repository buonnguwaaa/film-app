const Loading = () => {
    return (
        <div className='w-full h-full flex items-center justify-center bg-transparent absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-50'>
            <div className='animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-blue-500'></div>
        </div>
    )
}

export default Loading;