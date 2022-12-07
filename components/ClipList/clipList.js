import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Copy from '../../assets/img/copy.svg'
import Delete from '../../assets/img/delete.svg'
import RenderFile from "../RenderFile/RenderFile";
export default function ClipList({ session, render }) {
  const supabase = useSupabaseClient();
  const [list, setList] = useState([])

  useEffect(() => {
    fetchUserClipList();
  }, [session, render]);

  const setCopy = async (text) => {
    try {
      navigator.clipboard.writeText(text)
    } catch (error) {
      console.log("setLocalClip ~ error", error)
    }
  }

  const fetchUserClipList = async () => {
    try {
      const { data, error, status } = await supabase
        .from('clipboard')
        .select(`id, text, img, created_at`)
        .eq('userId', session.user?.id)
        .order('id', { ascending: false })
        .limit(5000)

      if (data.length > 0) {
        setList(data)
      }
    } catch (error) {

    }
  }



  const deleteClip = async (id, index, imgPath = false) => {
    try {
      await supabase
        .from('clipboard')
        .delete(1)
        .eq('id', id);
      console.log("deleteClip ~ imgPath", imgPath)
      if (imgPath) {
        await supabase.storage
          .from('avatars')
          .remove([imgPath])
      }
      list.splice(index, 1)
      setList([...list])
    } catch (error) {

    }
  }

  const renderCard = () => list.map((e, i) =>
  (<div key={`${i}-${e.id}`} className="card mb-2" >
    <div className="card-body" >
      <div className="row">
        <div className="col-9 d-flex align-items-center">
          <span>
            {e.text}
          </span>
          {e.img ? <>
            <RenderFile path={e.img} />
          </> : null}
        </div>
        <div className="col-1 text-center">
          <div className="btn btn-sm p-0" onClick={() => setCopy(e.text)}>
            <Image src={Copy} height={25} width={35} alt={'copy'} />
          </div>
        </div>
        <div className="col-2 text-center">
          <div className="btn  btn-sm p-0 " onClick={() => deleteClip(e.id, i, e.img)}>
            <Image src={Delete} height={18} width={35} alt={"delete"} />
          </div>
        </div>
      </div>
    </div>
  </div >)
  )

  return renderCard();

}