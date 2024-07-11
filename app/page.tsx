import React from "react";
import TicketCard from "./(components)/TicketCard";
import { TicketType } from "./typescript/TicketType";

const getTickets = async () => {
  try {
    const res = await fetch("https://ticketing-app-by-kai.vercel.app/api/Tickets", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const Dashboard = async () => {

  const data = await getTickets();

  // Make sure we have tickets needed for production build.
  if (!data?.tickets) {
    return <p>No tickets.</p>;
  }

  const tickets: TicketType[] = data.tickets;

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
        <div>
          {tickets && uniqueCategories?.map((uniqueCategory) => 
            <div key={uniqueCategory} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets.filter((ticket) => ticket.category === uniqueCategory).map((filteredTicket, _index) => (
                  <TicketCard key={filteredTicket.title} id={_index} ticket={filteredTicket} />
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  )
};

export default Dashboard