import { faHome, faTicket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
        <div className="flex items-center space-x-4">
            <Link href ="/">
                <FontAwesomeIcon icon={faHome} className="icon hover:cursor-pointer hover:text-gray-400" />
            </Link>
            <Link href ="/TicketPage/new">
                <FontAwesomeIcon icon={faTicket} className="icon hover:cursor-pointer hover:text-gray-400" />
            </Link>
        </div>
        <div className="flex space-x-4">
            <Link href ="/">
                <FontAwesomeIcon icon={faUser} className="icon hover:cursor-pointer hover:text-gray-400" />
            </Link>
            <p className="text-default-text">
                logged as invited
            </p>
        </div>
    </nav>
  );
};

export default Nav