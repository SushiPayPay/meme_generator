"use client";

type ImageProps = {
  key: number;
  path: string | null;
  onClick: (path: string | null) => void;
  isFocused: boolean;
}

export default function Image(props: ImageProps) {
    return (
      <div className="flex w-1/3 flex-wrap">
        <div className="w-full p-1 md:p-2" onClick={() => props.onClick(props.path)}>
          {!props.path && <div
            className={`animate-pulse block w-full aspect-square rounded-lg object-cover object-center bg-gray-200 dark:bg-gray-700`}
          />}
          {props.path && <img
            alt="gallery"
            className={`block h-full w-full rounded-lg object-cover object-center filter hover:brightness-75 transition duration-300`}
            src={props.path}
          />}
        </div>
      </div>
    )
  }