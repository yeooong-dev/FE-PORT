import { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteEmployee, getCeoName, getDepartments } from "../../api/chart";
import UseUser from "../../hook/UseUser";
import { IoMdBookmark } from "react-icons/io";
import { useDarkMode } from "../../components/darkmode/DarkModeContext";
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

function Chart() {
    const [ceoName, setCeoName] = useState("");
    const [departments, setDepartments] = useState<DepartmentAttributes>({});
    const { user } = UseUser();
    const [departmentColors, setDepartmentColors] = useState<{
        [key: string]: string;
    }>({});
    const { darkMode } = useDarkMode();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState({
        departmentName: "",
        employeeName: "",
        employeeEmail: "",
    });

    useEffect(() => {
        const fetchCeoName = async () => {
            try {
                const ceoNameData = await getCeoName();
                setCeoName(ceoNameData);
            } catch (error) {
                console.error("Error fetching CEO name:", error);
            }
        };

        fetchCeoName();
    }, []);

    useEffect(() => {
        const savedColors = JSON.parse(localStorage.getItem("departmentColors") || "{}");

        const fetchDepartments = async () => {
            try {
                const departmentsData = await getDepartments();
                setDepartments(departmentsData);

                const newColors = { ...savedColors };
                Object.keys(departmentsData).forEach((departmentName) => {
                    if (!newColors[departmentName]) {
                        newColors[departmentName] = generateRandomColor();
                    }
                });

                setDepartmentColors(newColors);
                localStorage.setItem("departmentColors", JSON.stringify(newColors));
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    const handleDeleteConfirmation = (departmentName: string, employeeName: string, employeeEmail: string) => {
        setSelectedEmployee({ departmentName, employeeName, employeeEmail });
        setShowConfirmDialog(true);
    };

    const handleDeleteEmployee = async () => {
        try {
            await deleteEmployee({
                departmentName: selectedEmployee.departmentName,
                employee: { email: selectedEmployee.employeeEmail },
            });
            const updatedDepartments = await getDepartments();
            setDepartments(updatedDepartments);
        } catch (error) {
            console.error("Error deleting employee:", error);
        } finally {
            setShowConfirmDialog(false);
        }
    };

    function generateRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <>
            {showConfirmDialog && (
                <CustomConfirm
                    message='정말 삭제하시겠습니까?'
                    onConfirm={handleDeleteEmployee}
                    onCancel={() => setShowConfirmDialog(false)}
                />
            )}
            <ChartWrap>
                <CEO darkMode={darkMode}>
                    <p>{ceoName || "이름을 등록해주세요."}</p>
                    <h1>CEO</h1>
                </CEO>
                <Employee darkMode={darkMode}>
                    <div className='max'>
                        {Object.keys(departments).length === 0 ? (
                            <p className='null'>부서를 등록해주세요.</p>
                        ) : (
                            Object.entries(departments).map(([departmentName, employeesObj], index) => {
                                const departmentColor = departmentColors[departmentName] || generateRandomColor();
                                return (
                                    <Team key={index} darkMode={darkMode}>
                                        <IoMdBookmark size='60' className='icon' style={{ color: departmentColor }} />
                                        <h1>{departmentName}</h1>
                                        {Object.entries(employeesObj).map(([employeeName, employee], empIndex) => (
                                            <div key={empIndex} className='employee'>
                                                <p>{employeeName}</p>
                                                <p>{employee.email}</p>
                                                <p className='joinYear'>{employee.joinYear}</p>
                                                {user?.isCompany && (
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteConfirmation(
                                                                departmentName,
                                                                employeeName,
                                                                employee.email
                                                            )
                                                        }
                                                    >
                                                        X
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </Team>
                                );
                            })
                        )}
                    </div>
                </Employee>
            </ChartWrap>
        </>
    );
}

export default Chart;

interface darkProps {
    darkMode: boolean;
}

export const ChartWrap = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    color: #575757;
    padding: 50px;
`;

export const CEO = styled.div<darkProps>`
    width: 20%;
    max-width: 250px;
    min-width: 250px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: ${({ darkMode }) => (darkMode ? "#2e2e2e" : "#f0f0f0")};
    color: ${({ darkMode }) => (darkMode ? "white" : "black")};

    border-radius: 20px;
    padding: 20px;
    margin-bottom: 20px;

    p {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    h1 {
        font-size: 14px;
    }

    @media (max-width: 550px) {
        min-width: 200px;
    }
`;

export const Employee = styled.div<darkProps>`
    width: 90%;
    height: 62vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background: ${({ darkMode }) => (darkMode ? "#2e2e2e" : "#f0f0f0")};
    color: ${({ darkMode }) => (darkMode ? "white" : "black")};
    border-radius: 20px;
    padding: 15px;

    .max {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        .null {
            display: flex;
            align-items: center;
        }
    }

    @media (max-width: 550px) {
        width: 80%;
        height: 80vh;
    }
`;

export const Team = styled.div<darkProps>`
  width: 200px;
  height: 350px;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background: ${({ darkMode }) => (darkMode ? "#636363" : "#f9f9f9")};
  border-radius: 20px;
  padding: 30px;
  margin: 15px;
  position: relative;
  box-shadow: 5px 5px 6px 4px rgba(0, 0, 0, 0.09);
  -webkit-box-shadow: 5px 5px 6px 4px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 5px 5px 6px 4px rgba(0, 0, 0, 0.09);


  h1 {
    font-size: 25px;
    margin-bottom: 5px;
  }

  .icon {
    position: absolute;
    top: -10px;
    left: 20px;
    z-index: 99;
  }

  .employee {
    width: 100%;
    min-height: 200px
    max-height: 200px;
    margin: 10px;
    padding: 6px;
    border: 2px dotted #c9c9c9;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;

    p:first-child {
      font-size: 18px;
      font-weight: bold;
    }

    p {
      padding: 5px;
    }

    .joinYear {
      font-size: 14px;
      font-weight: bold;
    }

    button {
      position: absolute;
      top: 10px;
      right: 15px;
      cursor: pointer;
      background: white;
      border-radius: 50px;
      width: 20px;
      height: 20px;
      color: #adadad;
      box-shadow: 5px 5px 6px 4px rgba(0, 0, 0, 0.09);
      -webkit-box-shadow: 5px 5px 6px 4px rgba(0, 0, 0, 0.09);
      -moz-box-shadow: 5px 5px 6px 4px rgba(0, 0, 0, 0.09);
    }
  }
`;
