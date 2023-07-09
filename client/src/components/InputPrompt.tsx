"use client";
import { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;

export default function InputPrompt({ setFocusImage, setImageList }: { setFocusImage: Dispatch<SetStateAction<string | null>>, setImageList: Dispatch<SetStateAction<string[]>> }) {
    const [inputValue, setInputValue] = useState('');
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      setFocusImage(null);
    
      axios.post(`${SERVER_API_URL}/meme`, { text: inputValue }, {
        validateStatus: function (status) {
          return true; // I'm always okay with the result (we handle errors later)
        },
      })
      .then(response => {
        if (response.status === 200) {
          const { urlExtension } = response.data;
          const url = SERVER_API_URL + `${urlExtension}`;
          setFocusImage(url); // Set focusImage to the contents value
          setImageList((prevImageList) => [url, ...prevImageList]);
        } else if (response.status === 406) {
          console.error('A 406 error occurred!', response.data);
          setFocusImage(SERVER_API_URL + '/meme/error/meme_unacceptable.jpg');
        } else if (response.status === 500) {
          console.error('A 500 error occurred!', response.data);
          setFocusImage(SERVER_API_URL + '/meme/error/meme_internal_error.jpg');
        } else {
          console.error('An error occurred!', response.data);
        }
      })
      .catch(error => {
        console.error('An network error occurred!', error);
      });
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };
  
    return (
      <>
        <form onSubmit={handleSubmit} className="w-full my-10 flex flex-wrap justify-center">
          <label
            className="flex flex-shrink-0 w-full justify-center text-3xl mb-2 font-medium text-gray-900 dark:text-white"
          >
            AI Meme Generator
          </label>
          <input
            className="flex flex-shrink-0 sm:w-1/3 w-1/2 mr-2 focus:outline-none bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            onChange={handleInputChange}
            placeholder="Enter prompt..."
            required
          >
          </input>
          <button
            type="submit"
            className="text-white bg-blue-700 border dark:border-gray-600 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </>
    )
}