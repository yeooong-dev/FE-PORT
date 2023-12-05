import { useNavigate } from "react-router-dom";
import { useSearchResults } from "./SearchResultsContext";
import { ResultWrap } from "./StSearchBar";

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
      <span key={index} style={{ backgroundColor: "yellow" }}>
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

  const hasResults =
    searchResults &&
    (searchResults.todos.length > 0 ||
      searchResults.familyEvents.length > 0 ||
      searchResults.calendar.length > 0);

  return (
    <ResultWrap>
      {hasResults ? (
        <>
          {searchResults?.todos.map((todo) => (
            <div key={`todo-${todo.todo_id}`} onClick={() => navigate(`/todo`)}>
              <p>오늘의 할 일</p>
              <span>
                {todo.text
                  ? highlightSearchTerm(todo.text, lastSearchTerm)
                  : null}
              </span>
              <span>{todo.completed ? "완료" : "미완료"}</span>
              <span>
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
              <p>경조사 기록</p>
              <span>
                {event.target
                  ? highlightSearchTerm(event.target, lastSearchTerm)
                  : null}
              </span>
              <span>
                {event.type
                  ? highlightSearchTerm(event.type, lastSearchTerm)
                  : null}
              </span>

              <span>
                {new Date(event.date).toLocaleString()
                  ? highlightSearchTerm(
                      new Date(event.date).toLocaleString(),
                      lastSearchTerm
                    )
                  : null}
              </span>

              <p>금액: {event.amount}</p>
            </div>
          ))}

          {searchResults?.calendar.map((event, index) => (
            <div
              key={`calendarEvent-${event.event_id || index}`}
              onClick={() => navigate(`/calendar`)}
            >
              <p>나의 캘린더</p>
              <span>
                {event.title
                  ? highlightSearchTerm(event.title, lastSearchTerm)
                  : null}
              </span>
              <p>
                시작 날짜 :{" "}
                {new Date(event.start_date).toLocaleString()
                  ? highlightSearchTerm(
                      new Date(event.start_date).toLocaleString(),
                      lastSearchTerm
                    )
                  : null}
              </p>
              <p>
                시작 날짜 :{" "}
                {new Date(event.end_date).toLocaleString()
                  ? highlightSearchTerm(
                      new Date(event.end_date).toLocaleString(),
                      lastSearchTerm
                    )
                  : null}
              </p>
            </div>
          ))}
        </>
      ) : (
        <p>"{lastSearchTerm}" 에 대한 검색 결과가 없습니다.</p>
      )}
    </ResultWrap>
  );
}

export default SearchResultsPage;
