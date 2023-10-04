import styled from "styled-components";
import Calendar from "react-calendar";

export const StyledCalendar = styled(Calendar)`
  width: 80%;
  background: white;
  margin-top: 30px;

  .react-calendar__navigation {
    width: 100%;
    display: flex;
    background: none;
    height: 70px;
    line-height: 70px;
    cursor: pointer;
    margin-bottom: 35px;

    button {
      font-size: 2rem;
      background: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    button:first-child,
    button:last-child {
      cursor: pointer;
      width: 50px;
      font-size: 2rem;
      color: gray;
    }

    button:nth-child(3) {
      width: 50px;
      font-size: 1.5rem;
      color: #575757;
      font-weight: bold;
      cursor: pointer;
    }

    button:nth-child(2),
    button:nth-child(4) {
      cursor: pointer;
      width: 50px;
      font-size: 4rem;
      color: gray;
    }
  }

  .react-calendar__navigation button:first-child,
  .react-calendar__navigation button:last-child {
    background-image: url("your-left-arrow-image-url");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .react-calendar__tile.has-schedule {
    position: relative;
  }

  .react-calendar__tile.has-schedule::after {
    content: "";
    position: absolute;
    bottom: 5px;
    left: 50%;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    transform: translateX(-50%);
  }

  .react-calendar__month-view__weekdays__weekday {
    font-weight: bold;
    color: #333;
    height: 50px;
    line-height: 50px;
    font-size: 1.6rem;
  }

  .react-calendar__tile {
    height: 100px;
    background-color: #f6f6f6;
    cursor: pointer;
    background: none;
    font-size: 1.1rem;
  }

  .react-calendar__tile--now {
    background-color: #51439d;
    color: white;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }

  .react-calendar__tile--active {
    background: #86b3d1;
    color: white;
  }
`;
