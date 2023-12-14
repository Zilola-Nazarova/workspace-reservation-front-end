const Footer = () => (
  <footer className="flex flex-col gap-1 justify-center items-center">
    <ul className="flex justify-evenly items-center gap-4">
      <li>
        <a
          href="https://github.com/badger-99/workspace-reservation-back-end"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub backend repository"
        >
          <i className="fa-solid fa-database" />
        </a>
      </li>
      <li>
        <a
          href="https://github.com/Zilola-Nazarova/workspace-reservation-front-end"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub frontend repository"
        >
          <i className="fa-solid fa-desktop" />
        </a>
      </li>
      <li>
        <a
          href="https://github.com/users/badger-99/projects/7/views/1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub project kanban"
        >
          <i className="fa-solid fa-calendar-days" />
        </a>
      </li>
    </ul>
    <div>
      <p className=" text-sm ">All rights reserved</p>
    </div>
  </footer>
);

export default Footer;
