type ImageProps = {
  key: number;
  path: string;
}

export default function Home() {
  function renderImages() {
    const images = [];
    for (let i = 0; i < 10; i++) {
      images.push(<Image path={"https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"} key={i} />);
    }
    return images;
  }

  return (
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
      <div className="-m-1 flex flex-wrap md:-m-2">
        {renderImages()}
      </div>
    </div>
  )
}

export function Image(props: ImageProps) {
  return (
    <div className="flex w-1/3 flex-wrap">
    <div className="w-full p-1 md:p-2">
      <img
        alt="gallery"
        className="block h-full w-full rounded-lg object-cover object-center"
        src={props.path} />
    </div>
  </div>
  )
}

