import Image from "next/image";
import { useEffect, useState } from "react";
import supabase from "../../provider/supabase";

export default function RenderFile({ path }) {
  const [fileType, setFileType] = useState('')
  const [imgSrc, setImgSrc] = useState(false);
  const fileName = path.split('/')[1]


  useEffect(() => {
    downloadImage(path)
  }, [path]);

  function getFileType(file) {
    if (file.type.match('image.*'))
      return 'image';
    if (file.type.match('video.*'))
      return 'video';
    if (file.type.match('audio.*'))
      return 'audio';
    if (file.type.match('pdf.*'))
      return "pdf"
    // etc...
    return 'other';
  }
  var download = {}
  async function downloadImage(path) {
    try {
      if (!download[path]) {
        download[path] = true;
        const { data, error } = await supabase.storage.from('avatars').download(`${path}`)
        console.log("downloadImage ~ data", data)
        if (error) {
          throw error
        }
        setFileType(getFileType(data));
        setImgSrc(URL.createObjectURL(data))
      }

    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }


  return <>
    {
      imgSrc && !!fileType ?
        <a href={imgSrc} download={fileName}>
          {fileType === 'image' ? <Image src={imgSrc} alt={fileName} height={150} width={150}></Image> : null}
          {fileType === 'video' ? <video height="150"><source src="imgSrc"></source></video> : null}
          {fileType === 'audio' ? '' : null}
          {fileType === 'pdf' ? <div>
            {fileName}
          </div> : null}
        </a>
        : null
    }
  </>
}