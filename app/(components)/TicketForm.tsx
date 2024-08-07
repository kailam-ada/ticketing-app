"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { TicketType } from "../typescript/TicketType";

const TicketForm = ({ticket}: {ticket: TicketType}) => {

  const EDITMODE = ticket._id !== "new"
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`https://ticketing-app-by-kai.vercel.app/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify(formData), // update this line
        headers: { "Content-Type": "application/json" }, // add this line
        // body: JSON.stringify({ formData }),
        // "Content-Type": "application/json",
      });
  
      if (!res.ok) {
        throw new Error("Failed to update Ticket.");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify(formData), // update this line
        headers: { "Content-Type": "application/json" }, // add this line        
        // body: JSON.stringify({ formData }),
        // "Content-Type": "application/json",
      });
  
      if (!res.ok) {
        throw new Error("Failed to create Ticket.");
      }

    }

    router.refresh();
    router.push("/");
  };

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };

  if(EDITMODE) {
    startingTicketData["title"] = ticket.title
    startingTicketData["description"] = ticket.description
    startingTicketData["priority"] = ticket.priority
    startingTicketData["progress"] = ticket.progress
    startingTicketData["status"] = ticket.status
    startingTicketData["category"] = ticket.category
  }

  const [formData, setFormData] = useState(startingTicketData);
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2 shadow-md"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3 className="text-blue-600">{ EDITMODE ? "Update your Ticket" : "Create Your Ticket"}</h3>
        <label className="text-blue-600">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
          className="shadow-inner"
        />
        <label className="text-blue-600">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows={5}
          className="shadow-inner"
        />
        <label className="text-blue-600">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="shadow-inner"
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Project">Project</option>
        </select>

        <label className="text-blue-600">Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label className="text-blue-600">1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label className="text-blue-600">2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label className="text-blue-600">3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label className="text-blue-600">4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label className="text-blue-600">5</label>
        </div>
        <label className="text-blue-600">Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label className="text-blue-600">Status</label>
        <select
          name="status"
          id=""
          value={formData.status}
          onChange={handleChange}
          className="shadow-inner"
        >
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <input type="submit" className="btn" value={ EDITMODE ? "Update Ticket" : "Create Ticket"} />
      </form>
    </div>
  );
};

export default TicketForm;
