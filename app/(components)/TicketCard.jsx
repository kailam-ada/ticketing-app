import Link from "next/link";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import StatusDisplay from "./StatusDisplay";


const TicketCard = ({ticket}) => {

  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  }

  return (
    <div className="flex flex-col bg-card hover:bg-card-hover hover:text-white rounded-md shadow-md p-3 m-2">
      <div className="flex mb-3">
        <PriorityDisplay priority={ticket.priority} />
        <div className="ml-auto">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>
      <Link href={`/TicketPage/${ticket._id}`} style={{}}>
      <h4>{ticket.title}</h4>
      <hr className="h-px border-0 bg-black mb-2" />
      <p className="whitespce-pre-wrap">
        {ticket.description}
      </p>
      <div className="flex-grow"></div>
      <div className="flex mt-2">
        <div className="flex flex-col">
          <p className="text-xs my-1">created {formatTimestamp(ticket.createdAt)}</p>
          {(ticket.status === "done" || ticket.status === "started") && ticket.createdAt !== ticket.updatedAt && (
              <p className="text-xs my-1 italic">updated {formatTimestamp(ticket.updatedAt)} status: {ticket.status}</p>
          )}          
          <ProgressDisplay progress={ticket.progress}/>
        </div>
        <div className="ml-auto flex items-end">
          <StatusDisplay status={ticket.status} />
        </div>
      </div>
      </Link>
    </div>
  );
}

export default TicketCard;
