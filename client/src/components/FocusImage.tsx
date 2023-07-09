"use client";

type FocusImageProps = {
  path: string | null;
}

export default function FocusImage(props: FocusImageProps) {
    return (
      <div className="w-full mb-10 flex justify-center">
        {!props.path && <div
          className="animate-pulse block w-1/2 aspect-square rounded-lg object-cover object-center bg-gray-200 dark:bg-gray-700"
        />}
        {props.path && <img
          alt="gallery"
          className="block w-1/2 h-full rounded-lg object-cover object-center"
          src={props.path}
        />}
      </div>
    )
  }