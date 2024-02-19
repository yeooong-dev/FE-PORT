import instance from "./instance";

interface EmployeeAttributes {
  name: string;
  email: string;
  joinYear: number;
  annualLeaveLimit: string;
}

// 대표 이름 가져오기
export const getCeoName = async () => {
  try {
    const response = await instance.get("chart/getCeoName");
    return response.data.ceoName;
  } catch (error) {
    throw error;
  }
};

// 대표 이름 업데이트
export const updateCeoName = async (ceoName: string) => {
  try {
    const response = await instance.post("chart/updateCeoName", {
      ceoName,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 부서 정보 가져오기
export const getDepartments = async () => {
  try {
    const response = await instance.get("chart/getDepartments");

    return response.data;
  } catch (error) {
    throw error;
  }
};

// 부서 정보 업데이트
export const updateDepartments = async (departments: {
  [key: string]: any;
}) => {
  try {
    const response = await instance.post("chart/updateDepartments", {
      departments,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 부서 삭제
export const deleteDepartment = async (departmentName: string) => {
  try {
    const response = await instance.post("chart/deleteDepartment", {
      departmentName,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 직원 등록
export const registerEmployee = async ({
  departmentName,
  employee,
}: {
  departmentName: string;
  employee: EmployeeAttributes;
}) => {
  try {
    const response = await instance.post("chart/registerEmployee", {
      departmentName,
      employee,
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

// 직원 삭제
export const deleteEmployee = async ({
  departmentName,
  employee,
}: {
  departmentName: string;
  employee: { email: string };
}) => {
  try {
    const response = await instance.post("chart/deleteEmployee", {
      departmentName,
      employee,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 기업 연차 설정
export const getDailyMaxLeaves = async () => {
  try {
    const response = await instance.get("chart/getDailyMaxLeaves");
    return response.data.dailyMaxLeaves;
  } catch (error) {
    throw error;
  }
};

// 기업 연차 수정
export const updateDailyMaxLeaves = async (dailyMaxLeaves: string) => {
  try {
    const response = await instance.post("chart/updateDailyMaxLeaves", {
      dailyMaxLeaves,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
