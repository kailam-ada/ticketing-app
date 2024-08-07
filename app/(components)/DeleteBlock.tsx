"use client";

import { faSquareXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation";

const DeleteBlock = ({ id }: { id: string }) => {
  const router = useRouter();

  const deleteTicket = async () => {
    const res = await fetch(`https://ticketing-app-by-kai.vercel.app/api/Tickets/${id}`, {
      method: "DELETE"
    });
    if (res.ok){
      router.refresh()
    }
  };

  return (
    <FontAwesomeIcon icon={faSquareXmark} className="text-red-400 hover:cursor-pointer hover:text-red-200 " onClick={deleteTicket} />
  )
}

export default DeleteBlock