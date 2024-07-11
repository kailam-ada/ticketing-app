import TicketForm from "@/app/(components)/TicketForm";
import { TicketType } from "@/app/typescript/TicketType";

const getTicketById = async (id: string) => {
    const res = await fetch(`https://ticketing-app-by-kai.vercel.app/api/Tickets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to get ticket.");
    }

    return res.json();
}

const TicketPage = async ({ params }: { params: { id: string } }) => {
  const EDITMODE = params.id !== "new";
  let updateTicketData: TicketType = {
    _id: "",
    title: "",
    description: "",
    category: "",
    priority: 0,
    progress: 0,
    status: "",
    active: false,
    createdBy: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (EDITMODE) {
    const response = await getTicketById(params.id);
    updateTicketData = response.foundTicket;
  } else {
    updateTicketData._id = "new";
  }
  return <TicketForm ticket={updateTicketData} />
}

export default TicketPage