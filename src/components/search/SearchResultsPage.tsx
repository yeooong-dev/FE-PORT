import { useNavigate } from "react-router-dom";
import { useSearchResults } from "./SearchResultsContext";
import { ResultWrap } from "./StSearchBar";
import { useDarkMode } from "../../components/darkmode/DarkModeContext";

function highlightSearchTerm(
  text: string | undefined,
  searchTerm: string
): JSX.Element[] {
  if (!text) {
    return [];
  }

  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className='highlight'>
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

function SearchResultsPage() {
  const { searchResults, lastSearchTerm } = useSearchResults();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const hasResults =
    searchResults &&
    (searchResults.todos.length > 0 ||
      searchResults.familyEvents.length > 0 ||
      searchResults.calendar.length > 0);

  return (
    <ResultWrap darkMode={darkMode}>
      {hasResults ? (
        <>
          {searchResults?.todos.map((todo) => (
            <div key={`todo-${todo.todo_id}`} onClick={() => navigate(`/todo`)}>
              <b>오늘의 할 일</b>
              <span className='title'>
                {todo.text
                  ? highlightSearchTerm(todo.text, lastSearchTerm)
                  : null}
              </span>
              <span className='clear'>
                {todo.completed ? "완료" : "미완료"}
              </span>
              <span className='date'>
                {new Date(todo.created_at).toLocaleString()
                  ? highlightSearchTerm(
                      new Date(todo.created_at).toLocaleString(),
                      lastSearchTerm
                    )
                  : null}
              </span>
            </div>
          ))}

          {searchResults?.familyEvents.map((event, index) => (
            <div
              key={
                event.event_id
                  ? `familyEvent-${event.event_id}`
                  : `familyEvent-index-${index}`
              }
              onClick={() => navigate(`/event`)}
            >
              <b>경조사 기록</b>
              <span className='title'>
                경조사 대상 :
                {event.target
                  ? highlightSearchTerm(event.target, lastSearchTerm)
                  : null}
              </span>
              <span className='title'>
                경조사 날짜 :{" "}
                {new Date(event.date).toLocaleString()
                  ? highlightSearchTerm(
                      new Date(event.date).toLocaleString(),
                      lastSearchTerm
                    )
                  : null}
              </span>
              <span className='title'>
                경조사 유형 :
                {event.type
                  ? highlightSearchTerm(event.type, lastSearchTerm)
                  : null}
              </span>
              <span className='title last'>경조사 금액 : {event.amount}</span>
            </div>
          ))}

          {searchResults?.calendar.map((event, index) => (
            <div
              key={`calendarEvent-${event.event_id || index}`}
              onClick={() => navigate(`/calendar`)}
            >
              <b>나의 캘린더</b>
              <span className='title'>
                {event.title
                  ? highlightSearchTerm(event.title, lastSearchTerm)
                  : null}
              </span>
              <span className='date'>
                {new Date(event.startDate).toLocaleString()
                  ? highlightSearchTerm(
                      new Date(event.startDate).toLocaleString(),
                      lastSearchTerm
                    )
                  : null}{" "}
                ~ <br />
                {new Date(event.endDate).toLocaleString()
                  ? highlightSearchTerm(
                      new Date(event.endDate).toLocaleString(),
                      lastSearchTerm
                    )
                  : null}
              </span>
            </div>
          ))}
        </>
      ) : (
        <p className='none'>"{lastSearchTerm}" 에 대한 검색 결과가 없습니다.</p>
      )}
    </ResultWrap>
  );
}

export default SearchResultsPage;
