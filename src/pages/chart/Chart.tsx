import { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteEmployee, getCeoName, getDepartments } from "../../api/chart";

interface EmployeeAttributes {
  name: string;
  email: string;
  joinYear: number;
}

interface DepartmentAttributes {
  [departmentName: string]: { [employeeName: string]: EmployeeAttributes };
}

function Chart() {
  const [ceoName, setCeoName] = useState("");
  const [departments, setDepartments] = useState<DepartmentAttributes>({});
  const [isCompanyUser, setIsCompanyUser] = useState(false);

  useEffect(() => {
    const fetchCeoName = async () => {
      try {
        const ceoNameData = await getCeoName();
        setCeoName(ceoNameData);
      } catch (error) {
        console.error("Error fetching CEO name:", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const departmentsData = await getDepartments();
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const checkIfCompanyUser = async () => {
      try {
        setIsCompanyUser(true);
      } catch (error) {
        console.error("Error checking if user is company user:", error);
      }
    };

    fetchCeoName();
    fetchDepartments();
    checkIfCompanyUser();
  }, []);

  const handleDeleteEmployee = async (
    departmentName: string,
    employeeName: string
  ) => {
    try {
      await deleteEmployee(departmentName, employeeName);
      const updatedDepartments = await getDepartments();
      setDepartments(updatedDepartments);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <ChartWrap>
      <CEO>
        <p>{ceoName || "대표이름"}</p>
        <h1>CEO</h1>
      </CEO>
      <Employee>
        {Object.entries(departments).map(
          ([departmentName, employeesObj], index) => {
            return (
              <Team key={index}>
                <h1>{departmentName}</h1>
                {Object.entries(employeesObj).map(
                  ([employeeName, employee], empIndex) => (
                    <div key={empIndex} className='employee'>
                      <p>{employeeName}</p>
                      <p>{employee.email}</p>
                      <p>{employee.joinYear}</p>
                      {isCompanyUser && (
                        <button
                          onClick={() =>
                            handleDeleteEmployee(departmentName, employeeName)
                          }
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  )
                )}
              </Team>
            );
          }
        )}
      </Employee>
    </ChartWrap>
  );
}

export default Chart;

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

export const CEO = styled.div`
  width: 250px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid #a8a8a8;
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 20px;

  p {
    font-size: 20px;
    font-weight: bold;
  }

  h1 {
    font-size: 14px;
  }
`;

export const Employee = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border: 2px solid #a8a8a8;
  border-radius: 20px;
  padding: 15px;
`;

export const Team = styled.div`
  width: 200px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid blue;
  border-radius: 20px;
  padding: 15px;
  margin: 10px;

  div {
    width: 80%;
    height: 70px;
    margin: 10px;
    border: 2px solid green;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;
