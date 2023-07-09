"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import InputPrompt from "@/components/InputPrompt";
import FocusImage from "@/components/FocusImage";
import Image from "@/components/Image";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;

type ImageProps = {
  key: number;
  path: string | null;
  onClick: (path: string | null) => void;
  isFocused: boolean;
}

type FocusImageProps = {
  path: string | null;
}

export default function Home() {
  const [focusImage, setFocusImage] = useState<string | null>('unset');
  const [imageList, setImageList] = useState<string[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${SERVER_API_URL}/meme`);
      const { urlExtensions } = response.data;
      const urls = urlExtensions.map((urlExtension: string) => SERVER_API_URL + `${urlExtension}`);
      setImageList(urls);
      // Set the focusImage to the first image from the fetched list
      if (urls.length > 0) {
        setFocusImage(urls[0]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const renderImages = () => {
    return imageList.map((imagePath, index) => (
      <Image path={imagePath} key={index} onClick={setFocusImage} isFocused={focusImage === imagePath} />
    ));
  };

  return (
    <div className="container mb-32 mx-auto px-5 py-2 lg:px-32 lg:pt-12">
      <div className="-m-1 flex flex-wrap md:-m-2">
        <InputPrompt setFocusImage={setFocusImage} setImageList={setImageList} />
        {focusImage !== 'unset' && <FocusImage path={focusImage} />}
        {renderImages()}
      </div>
    </div>
  )
}
