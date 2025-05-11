
export default function Logo() {
    return (
        <div className="w-11 h-9">
        <div className="" >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className="w-9 h-9"
            >
            <path
                className="main-shape fill-white"
                d="M 120,10 L 120,20 L 120,180 L 40,180 L 40,90"
            />
            <path
                className="cut-shape fill-white"
                d="M 120,90 L 200,10 L 200,90"
            />
            </svg>
        </div>
        </div>
    );
}
