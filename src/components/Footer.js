import styles from "../styles/Footer.module.css";

const Footer = () => (
  <footer className="flex flex-col gap-1 justify-center items-center">
    <ul className="flex justify-evenly items-center gap-4">
      <li>
        <a
          href="https://github.com/badger-99/workspace-reservation-back-end"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-solid fa-database"></i>
        </a>
      </li>
      <li>
        <a
          href="https://github.com/Zilola-Nazarova/workspace-reservation-front-end"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-solid fa-desktop"></i>
        </a>
      </li>
      <li>
        <a
          href="https://github.com/users/badger-99/projects/7/views/1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-solid fa-calendar-days"></i>
        </a>
      </li>
    </ul>
    <div>
      <p className=" text-sm ">All rights reserved</p>
    </div>
  </footer>
);

export default Footer;
