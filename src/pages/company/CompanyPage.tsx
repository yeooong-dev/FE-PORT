import styled from "styled-components";
import { useDarkMode } from "../../components/darkmode/DarkModeContext";
import { useEffect, useState } from "react";
import {
  deleteDepartment,
  getDepartments,
  registerEmployee,
  updateCeoName,
  updateDailyMaxLeaves,
  updateDepartments,
} from "../../api/chart";
import CustomAlert from "../../components/alert/CustomAlert";
import CustomConfirm from "../../components/alert/CustomConfirm";

interface EmployeeAttributes {
  name: string;
  email: string;
  joinYear: number;
  annualLeaveLimit: number;
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
  const [employeeAnnualLeaveLimit, setEmployeeAnnualLeaveLimit] = useState("");

  const [dailyMaxLeaves, setDailyMaxLeaves] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"error" | "success">("error");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState("");

  const handleShowAlert = (message: string, type: "error" | "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
  };

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
      handleShowAlert("대표 이름을 입력해주세요.", "error");
      return;
    }
    try {
      await updateCeoName(ceoName);
      handleShowAlert("대표 이름이 저장되었습니다.", "success");
      setCeoName("");
    } catch (error) {
      console.error("Error updating CEO name:", error);
      handleShowAlert("대표 이름 저장 중 오류가 발생했습니다.", "error");
    }
  };

  const handleSaveDepartment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!departmentName.trim()) {
      handleShowAlert("부서명을 입력해주세요.", "error");
      return;
    }
    try {
      let newDepartments = { ...departments };
      newDepartments[departmentName] = {};
      await updateDepartments(newDepartments);
      handleShowAlert("부서가 등록되었습니다.", "success");
      setDepartments(newDepartments);
      setDepartmentName("");
    } catch (error) {
      console.error("Error updating department:", error);
      handleShowAlert("부서 등록 중 오류가 발생했습니다.", "error");
    }
  };

  const handleConfirmDelete = (departmentName: string) => {
    setDepartmentToDelete(departmentName);
    setShowConfirmDialog(true);
  };

  const handleDeleteDepartment = async () => {
    if (!departmentToDelete) return;

    try {
      await deleteDepartment(departmentToDelete);
      const updatedDepartments = await getDepartments();
      setDepartments(updatedDepartments);
      handleShowAlert("부서가 삭제되었습니다.", "success");
    } catch (error) {
      console.error("Error deleting department:", error);
      handleShowAlert("부서 삭제 중 오류가 발생했습니다.", "error");
    }
    setShowConfirmDialog(false);
  };

  const renderDepartmentList = () => {
    return (
      <div>
        {Object.keys(departments).map((departmentName, index) => (
          <div key={index}>
            <span>{departmentName}</span>
            <button onClick={() => handleConfirmDelete(departmentName)}>
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
    if (
      !employeeName ||
      !employeeEmail ||
      !joinYear ||
      !selectedDepartment ||
      !employeeAnnualLeaveLimit
    ) {
      handleShowAlert("모든 필드를 채워주세요.", "error");
      return;
    }

    try {
      await registerEmployee({
        departmentName: selectedDepartment,
        employee: {
          name: employeeName,
          email: employeeEmail,
          joinYear: parseInt(joinYear, 10),
          annualLeaveLimit: employeeAnnualLeaveLimit,
        },
      });
      handleShowAlert("직원이 등록되었습니다.", "success");
      setEmployeeName("");
      setEmployeeEmail("");
      setJoinYear("");
      setSelectedDepartment("");
      setEmployeeAnnualLeaveLimit("");
      setDepartments(await getDepartments());
    } catch (error: any) {
      handleShowAlert(
        error.message || "직원 등록 중 오류가 발생했습니다.",
        "error"
      );
    }
  };

  const handleSaveDailyMaxLeaves = async () => {
    if (!dailyMaxLeaves.trim()) {
      handleShowAlert("입력 후 저장해주세요.", "error");
      return;
    }
    try {
      await updateDailyMaxLeaves(dailyMaxLeaves);
      handleShowAlert("연차 설정이 완료되었습니다.", "success");
      setDailyMaxLeaves("");
    } catch (error) {
      console.error("Error updating dailyMaxLeaves:", error);
      handleShowAlert("연차 설정 저장 중 오류가 발생했습니다.", "error");
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "company":
        return (
          <TabContainer darkMode={darkMode}>
            <Setting darkMode={darkMode}>
              <div className='page'>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveCeoName();
                  }}
                >
                  <h1>조직도 페이지</h1>
                  <div className='inputBox'>
                    <p>대표이름 설정</p>
                    <input
                      type='text'
                      value={ceoName || ""}
                      onChange={(e) => setCeoName(e.target.value)}
                    />
                    <button type='submit'>저장</button>
                  </div>
                </form>

                <form onSubmit={handleSaveDepartment}>
                  <div className='inputBox'>
                    <p>부서 등록</p>
                    <input
                      type='text'
                      value={departmentName || ""}
                      onChange={(e) => setDepartmentName(e.target.value)}
                      placeholder='부서명'
                    />
                    <button type='submit'>등록</button>
                  </div>
                </form>
                <p style={{ fontSize: "14px", marginBottom: "-10px" }}>
                  부서 내역
                </p>
                <div className='listBox'>{renderDepartmentList()}</div>
              </div>

              <div className='page'>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveDailyMaxLeaves();
                  }}
                >
                  <h1>연차 신청 페이지</h1>
                  <div className='inputBox'>
                    <p> 하루 신청 가능 인원수</p>
                    <input
                      type='number'
                      value={dailyMaxLeaves || ""}
                      onChange={(e) => setDailyMaxLeaves(e.target.value)}
                    />
                    <button type='submit'>저장</button>
                  </div>
                </form>
              </div>
            </Setting>
          </TabContainer>
        );
      case "employee":
        return (
          <TabContainer darkMode={darkMode}>
            <Setting darkMode={darkMode}>
              <div className='page'>
                <form onSubmit={handleRegisterEmployee}>
                  <div className='inputBox2'>
                    <p>이름</p>
                    <input
                      type='text'
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                    />
                  </div>
                  <div className='inputBox2'>
                    <p>이메일</p>
                    <input
                      type='text'
                      value={employeeEmail}
                      onChange={(e) => setEmployeeEmail(e.target.value)}
                    />
                  </div>
                  <div className='inputBox2'>
                    <p> 입사년도 </p>
                    <input
                      type='date'
                      value={joinYear}
                      onChange={(e) => setJoinYear(e.target.value)}
                    />
                  </div>
                  <div className='inputBox2'>
                    <p> 부서명 </p>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className='select'
                    >
                      <option value=''>부서 선택</option>
                      {Object.keys(departments).map((departmentName, index) => (
                        <option key={index} value={departmentName}>
                          {departmentName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='inputBox2'>
                    <p>사용 가능 연차수</p>
                    <input
                      type='number'
                      value={employeeAnnualLeaveLimit}
                      onChange={(e) =>
                        setEmployeeAnnualLeaveLimit(e.target.value)
                      }
                    />
                  </div>
                  <button type='submit' className='add'>
                    등록
                  </button>
                </form>
              </div>
            </Setting>
          </TabContainer>
        );

      default:
        return null;
    }
  };
  return (
    <>
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}
      {showConfirmDialog && (
        <CustomConfirm
          message='정말 삭제하시겠습니까?'
          onConfirm={handleDeleteDepartment}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
      <TabContainer darkMode={darkMode}>
        <TabTop darkMode={darkMode}>
          <Tab
            selected={selectedTab === "company"}
            onClick={() => setSelectedTab("company")}
            className='nameEditBtn'
            darkMode={darkMode}
          >
            설정
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
  height: 65vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.2rem;
`;

const TabContainer = styled.div<darkProps>`
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
  color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const TabTop = styled.div<darkProps>`
  width: 50%;
  display: flex;
`;

export const Tab = styled.div<TabProps & darkProps>`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) =>
    props.darkMode
      ? props.selected
        ? "2.5px solid #3c57b3"
        : "2.5px solid #696969"
      : props.selected
      ? "2.5px solid #3c57b3"
      : "2.5px solid #cfcfcf"};

  color: ${(props) =>
    props.darkMode
      ? props.selected
        ? "#3c57b3"
        : "#696969"
      : props.selected
      ? "#3c57b3"
      : "#cfcfcf"};
  cursor: pointer;
  font-size: 1.25rem;

  @media (max-width: 550px) {
    font-size: 1rem;
  }
`;

export const Setting = styled.div<darkProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px;

  .page {
    width: 80%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 20px;
    border: ${({ darkMode }) =>
      darkMode ? "2px solid #696969" : "2px solid #d6d6d6"};
    margin-bottom: 30px;
    box-shadow: 5px 5px 6px 4px rgba(0, 0, 0, 0.09);
    -webkit-box-shadow: 5px 5px 6px 4px rgba(0, 0, 0, 0.09);
    -moz-box-shadow: 5px 5px 6px 4px rgba(0, 0, 0, 0.09);

    .listBox {
      width: 80%;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 20px 0 30px 0;
      background: ${({ darkMode }) => (darkMode ? "#454545" : "#ebebeb")};
      overflow-y: scroll;
      overflow-x: hidden;
      border-radius: 10px;
      font-size: 16px;

      div {
        width: 100%;
        height: 100%;
        padding: 13px;
        display: flex;
        align-items: center;
        flex-direction: column;

        div {
          width: 50%;
          height: auto;
          display: flex;
          flex-direction: row;
          justify-content: center;

          span {
            margin-right: 10px;
          }

          button {
            width: 50px;
            height: 30px;
            background: #e34f39;
          }
        }
      }
    }
  }

  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1 {
      margin: 15px;
      font-size: 18px;
      font-weight: bold;
    }
  }

  .inputBox {
    width: 80%;
    max-width: 500px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;

    p {
      font-size: 16px;
      margin-right: 10px;
    }
  }

  h1 {
    font-size: 22px;
    font-weight: bold;
  }

  input {
    width: 50%;
    max-width: 200px;
    min-width: 100px;
    height: 45px;
    padding: 0 1rem;
    font-size: 16px;
    background: #f7f7f7;
  }

  button {
    width: 15%;
    max-width: 100px;
    min-width: 50px;
    height: 45px;
    font-size: 16px;
    background: #3c57b3;
    color: white;
    cursor: pointer;
  }

  button:hover {
    opacity: 50%;
    transition: 0.3s;
  }

  .inputBox2 {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0px 10px 0;

    input {
      width: 35%;
      max-width: 500px;
      height: 50px;
      padding: 0 1rem;
      font-size: 16px;
      background: #f7f7f7;
    }

    p {
      font-size: 16px;
      margin-right: 10px;
    }

    .select {
      width: 35%;
      max-width: 500px;
      height: 50px;
      background: #f7f7f7;
      padding: 1rem;
    }
  }

  .add {
    width: 50%;
    max-width: 300px;
    height: 50px;
    font-size: 16px;
    background: #3c57b3;
    color: white;
    cursor: pointer;
    margin: 50px;
  }

  .add:hover {
    opacity: 50%;
    transition: 0.3s;
  }

  @media (max-width: 550px) {
    .page {
      .listBox {
        width: 80%;
        font-size: 14px;

        div {
          div {
            width: 100%;

            button {
              width: 25px;
              height: 25px;
              font-size: 14px;
            }
          }
        }
      }
    }

    .inputBox {
      flex-direction: column;

      p {
        font-size: 14px;
        margin-bottom: 10px;
      }

      input {
        width: 80%;
        height: 35px;
        margin-bottom: 10px;
      }

      button {
        height: 35px;
      }
    }

    .inputBox2 {
      margin: 30px 0px 0px 0;

      input {
        width: 30%;
        max-width: 350px;
        height: 40px;
        font-size: 16px;
      }

      p {
        font-size: 14px;
      }

      .select {
        width: 60%;
        max-width: 500px;
        height: 50px;
        background: #f7f7f7;
        padding: 1rem;
      }
    }

    .add {
      height: 40px;
      font-size: 16px;
    }
  }
`;
