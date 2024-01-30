import styled from "styled-components";
import { useDarkMode } from "../../components/darkmode/DarkModeContext";
import { useEffect, useState } from "react";
import {
  deleteDepartment,
  getDepartments,
  registerEmployee,
  updateCeoName,
  updateDepartments,
} from "../../api/chart";

interface EmployeeAttributes {
  name: string;
  email: string;
  joinYear: number;
}

interface DepartmentAttributes {
  [departmentName: string]: { [employeeName: string]: EmployeeAttributes };
}

function CompanyPage() {
  const [selectedTab, setSelectedTab] = useState<"company" | "employee" | null>(
    "company"
  );
  const { darkMode } = useDarkMode();

  const [ceoName, setCeoName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [departments, setDepartments] = useState<DepartmentAttributes>({});

  //직원 등록
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [joinYear, setJoinYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentsData = await getDepartments();
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleSaveCeoName = async () => {
    if (!ceoName.trim()) {
      alert("대표 이름을 입력해주세요.");
      return;
    }
    try {
      await updateCeoName(ceoName);
      alert("대표 이름이 저장되었습니다.");
      setCeoName("");
    } catch (error) {
      console.error("Error updating CEO name:", error);
      alert("대표 이름 저장 중 오류가 발생했습니다.");
    }
  };

  const handleSaveDepartment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!departmentName.trim()) {
      alert("부서명을 입력해주세요.");
      return;
    }

    try {
      let newDepartments = { ...departments };
      newDepartments[departmentName] = {};

      await updateDepartments(newDepartments);
      alert("부서가 등록되었습니다.");
      setDepartments(newDepartments);
      setDepartmentName("");
    } catch (error) {
      console.error("Error updating department:", error);
      alert("부서 등록 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteDepartment = async (departmentName: string) => {
    try {
      await deleteDepartment(departmentName);
      alert("부서가 삭제되었습니다.");
      const updatedDepartments = await getDepartments();
      setDepartments(updatedDepartments);
    } catch (error) {
      console.error("Error deleting department:", error);
      alert("부서 삭제 중 오류가 발생했습니다.");
    }
  };

  const renderDepartmentList = () => {
    return (
      <div>
        {Object.keys(departments).map((departmentName, index) => (
          <div key={index}>
            <span>{departmentName}</span>
            <button onClick={() => handleDeleteDepartment(departmentName)}>
              삭제
            </button>
          </div>
        ))}
      </div>
    );
  };

  const handleRegisterEmployee = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!employeeName || !employeeEmail || !joinYear || !selectedDepartment) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    try {
      await registerEmployee({
        departmentName: selectedDepartment,
        employee: {
          name: employeeName,
          email: employeeEmail,
          joinYear: parseInt(joinYear, 10),
        },
      });
      alert("직원이 등록되었습니다.");
      setEmployeeName("");
      setEmployeeEmail("");
      setJoinYear("");
      setSelectedDepartment("");
      setDepartments(await getDepartments());
    } catch (error) {
      console.error("Error registering employee:", error);
      alert("직원 등록 중 오류가 발생했습니다.");
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "company":
        return (
          <TabContainer darkMode={darkMode}>
            <Setting>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveCeoName();
                }}
              >
                <h1>대표이름 설정</h1>
                <input
                  type='text'
                  value={ceoName || ""}
                  onChange={(e) => setCeoName(e.target.value)}
                />
                <button type='submit'>변경사항 저장</button>
              </form>

              <form onSubmit={handleSaveDepartment}>
                <h1>부서 등록</h1>
                부서명
                <input
                  type='text'
                  value={departmentName || ""}
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
                <button type='submit'>등록</button>
              </form>
              <div>부서 내역: {renderDepartmentList()}</div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const dailyMaxLeaves = form.dailyMaxLeaves.value;
                  // handleSaveDailyMaxLeaves(Number(dailyMaxLeaves));
                }}
              >
                <h1>연차 설정</h1>
                하루 신청 가능 인원수{" "}
                <input type='number' name='dailyMaxLeaves' />
                <button type='submit'>변경사항 저장</button>
              </form>
            </Setting>
          </TabContainer>
        );
      case "employee":
        return (
          <TabContainer darkMode={darkMode}>
            <Setting>
              <form onSubmit={handleRegisterEmployee}>
                이름 &nbsp;
                <input
                  type='text'
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
                <br />
                이메일 &nbsp;
                <input
                  type='text'
                  value={employeeEmail}
                  onChange={(e) => setEmployeeEmail(e.target.value)}
                />
                <br />
                입사년도 &nbsp;
                <input
                  type='text'
                  value={joinYear}
                  onChange={(e) => setJoinYear(e.target.value)}
                />
                <br />
                부서명 &nbsp;
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value=''>부서 선택</option>
                  {Object.keys(departments).map((departmentName, index) => (
                    <option key={index} value={departmentName}>
                      {departmentName}
                    </option>
                  ))}
                </select>
                <button type='submit'>등록</button>
              </form>
            </Setting>
          </TabContainer>
        );

      default:
        return null;
    }
  };
  return (
    <>
      <TabContainer darkMode={darkMode}>
        <TabTop darkMode={darkMode}>
          <Tab
            selected={selectedTab === "company"}
            onClick={() => setSelectedTab("company")}
            className='nameEditBtn'
            darkMode={darkMode}
          >
            기업 설정
          </Tab>
          <Tab
            selected={selectedTab === "employee"}
            onClick={() => setSelectedTab("employee")}
            className='passwordEditBtn'
            darkMode={darkMode}
          >
            직원 등록
          </Tab>
        </TabTop>

        <Info darkMode={darkMode}>{renderContent()}</Info>
      </TabContainer>
    </>
  );
}

export default CompanyPage;

interface TabProps {
  selected: boolean;
  onClick: () => void;
}

interface darkProps {
  darkMode: boolean;
}

export const Info = styled.div<darkProps>`
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: ${({ darkMode }) => (darkMode ? "#222327" : "white")};
  font-size: 1.2rem;

  @media (max-width: 550px) {
    height: 300px;
  }
`;

const TabContainer = styled.div<darkProps>`
  width: 100%;
  height: 350px;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
  background: ${({ darkMode }) => (darkMode ? "#333" : "#f6f6f6")};
  color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  @media (max-width: 550px) {
    height: 300px;
  }

  @media (max-width: 320px) {
    height: 230px;
  }
`;

export const TabTop = styled.div<darkProps>`
  width: 100%;
  display: flex;
`;

export const Tab = styled.div<TabProps & darkProps>`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.darkMode
      ? props.selected
        ? "#333"
        : "#555"
      : props.selected
      ? "#f4f4f6"
      : "#dcdee3"};
  color: ${(props) =>
    props.darkMode
      ? props.selected
        ? "#fff"
        : "#ccc"
      : props.selected
      ? "#3c57b3"
      : "#ababab"};
  cursor: pointer;
  font-size: 1.25rem;

  @media (max-width: 550px) {
    font-size: 12px;
    height: 40px;
  }
`;

export const Setting = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px;

  input {
    width: 60%;
    height: 45px;
    margin-bottom: 20px;
    padding-left: 1rem;
    font-size: 1rem;
  }

  .lastInput {
    width: 480px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    width: 50px;
    max-width: 280px;
    height: 50px;
    font-size: 1.1rem;
    background: #3c57b3;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }

  button:hover {
    opacity: 50%;
    transition: 0.3s;
  }

  @media (max-width: 1000px) {
    .lastInput {
      max-width: 300px;
    }
  }

  @media (max-width: 850px) {
    .lastInput {
      max-width: 200px;
    }
  }

  @media (max-width: 660px) {
    .lastInput {
      max-width: 150px;
    }

    input {
      height: 35px;
      font-size: 14px;
    }

    button {
      width: 60%;
      max-width: 280px;
      height: 35px;
      font-size: 14px;
    }
  }

  @media (max-width: 360px) {
    .lastInput {
      max-width: 170px;
    }
  }
`;
