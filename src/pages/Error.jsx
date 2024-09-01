import React from "react";

function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-4">404 - Oops! You Caught Us Early</h1>
      <p className="text-lg text-center max-w-xl mb-6">
        It looks like you've stumbled upon a page that's not quite ready yet. But don't worry, we're working hard to bring you something amazing!
      </p>
      <p className="text-lg text-center max-w-xl mb-6">
        Don't miss out on the launch of our exciting new platform. Enter your email below, and we'll keep you updated with the latest news, exclusive offers, and more.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-md">
        <input
          type="email"
          placeholder="Input your Email"
          className="w-full md:w-3/4 px-4 py-2 mb-4 md:mb-0 md:mr-2 text-black rounded"
        />
        <button className="w-full md:w-1/4 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default Error;
