import {
  Calendar,
  FileSearch2,
  FileUser,
  House,
  MessagesSquare,
  NotebookPen,
  UserSearch,
} from "lucide-react";

export default function Labo() {
  return (
    <>
      <h1>Labo !</h1>
      <ul className="w-fit">
        <li className="m-1 flex border-2 p-1">
          <House />
          General
        </li>
        <li className="m-1 flex border-2 p-1">
          <MessagesSquare />
          Chat
        </li>
        <li className="m-1 flex border-2 p-1">
          <FileSearch2 />
          Documents
        </li>
        <li className="m-1 flex border-2 p-1">
          <NotebookPen />
          Notes
        </li>
        <li className="m-1 flex border-2 p-1">
          <UserSearch />
          Contacts
        </li>
        <li className="m-1 flex border-2 p-1">
          <FileUser />
          Mon personnage
        </li>
        <li className="m-1 flex border-2 p-1">
          <Calendar />
          Sessions
        </li>
      </ul>
    </>
  );
}
