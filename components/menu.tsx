export default function Menu() {
    return (
        <div className="w-[30rem] p-3 h-16 bg-[#fffff5]/80 backdrop-blur-sm flex justify-end items-center z-30">
            <div className="w-full flex justify-center bg-white items-center">
                <h1 className="text-2xl font-bold text-center text-[#333333] mb-4">
                    Welcome to RightHomeAI!
                    Create an account or sign in for personalized homes, AI search, and voice help.
                </h1>
            <button
                className="rounded-xl text-md border-2 border-[#f2f2f2] bg-white text-[#666666] hover:bg-[#f2f2f2] shadow-xl mr-4"
                onClick={() => {
                    window.location.href = "/login";
                }}
            >
                Sign In
            </button>
            </div>
        </div>
    );
}