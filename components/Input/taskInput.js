import { useRef, useState } from "react"
import supabase from "../../provider/supabase";
import { notify } from "../../provider/utils";
import AttechMent from "../../assets/img/attachment.svg"
import Image from "next/image";

export default function TaskInput({ userId, setRender, render }) {
  const textRef = useRef();
  const attechmentRef = useRef();
  const [uploading, setUploading] = useState(false)

  function sendMessage() {
    
    if (textRef.current.value.trim()) {
      saveClip(textRef.current.value)
    } else {
    }
    textRef.current.value = ""
  }
  async function saveClip(text = '', imgUrl = '') {
    try {
      const clip = {
        text,
        userId,
        img: imgUrl,
        created_at: new Date().toISOString(),
      }
      let { error } = await supabase.from('clipboard').upsert(clip);
      if (!error) {
        setRender(!render)
        notify('Saved successfully', 'success')
      } else {
        notify(error.message, 'error')
      }

    } catch (error) {

    }
  }

  const uploadImg = async (event) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }
      const file = event.target.files[0]
      const filePath = `${userId}/${file.name}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })
      if (uploadError) {
        throw uploadError
      }
      saveClip(textRef.current.value, filePath)

    } catch (error) {
      notify('Error uploading avatar!', 'error')
    } finally {
      // setUploading(false)
    }
  }

  return <div className="message-box">
    <textarea type="text" className="message-input" placeholder="Type message..." ref={textRef}></textarea>
    <div className="message-submit">
      <button className="attachment-btn">
        <input type="file" hidden name="attechment" ref={attechmentRef} onChange={uploadImg} />
        <Image src={AttechMent} alt="attachment" height={20} onClick={() => attechmentRef.current.click()} width={35}></Image>
      </button>
      <button type="submit" className=" send_btn" onClick={sendMessage}>Send</button>
    </div>
  </div>
}